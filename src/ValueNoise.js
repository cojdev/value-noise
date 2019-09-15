import PRNG from './helpers/PRNG';


export default class ValueNoise {
  /**
   * ValueNoise object
   * @param {number} wavelength space between noise nodes
   * @param {number} amplitude max value of output
   */
  constructor(settings = {}) {
    const options = Object.assign({
      seed: ~~(Math.random() * 2 ** 31),
      wavelength: 20,
      amplitude: 1,
      width: 50,
      height: 50,
      depth: 50,
      dimension: 2,
      octaves: 1,
      octaveIndex: 2,
    }, settings);

    Object.assign(this, options);

    this.randomise(this.seed);

    this.interpolate = this.quadratic;
  }

  cosine(pa, pb, px) {
    const ft = px * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return pa * (1 - f) + pb * f;
  }

  cubic(pa, pb, px) {
    if (px < 0.5) return 4 * px ** 3 * (pb - pa) + pa;
    return ((px - 1) * (2 * px - 2) * (2 * px - 2) + 1) * (pb - pa) + pa;
  }

  /**
   * Quadratically interpolates between points a and b
   * @param {number} pa point a
   * @param {number} pb point b
   * @param {number} px fractional distance
   */
  quadratic(pa, pb, px) {
    return px < 0.5 ? 2 * px ** 2 * (pb - pa) + pa : (-1 + (4 - 2 * px) * px) * (pb - pa) + pa;
  }

  /**
   * Linearly interpolate between 2 points
   * @param {number} pa point a
   * @param {number} pb point b
   * @param {number} px fractional distance
   */
  linear(pa, pb, px) {
    return pa + (pb - pa) * px;
  }

  /**
   * Regenerate rows array
   */
  randomise(seed = ~~(Math.random() * (2 ** 31 - 1))) {
    const rand = new PRNG(seed);
    const d = this.settings.dimension;

    this.rows = Array(this.height).fill(0).map(
      () => {
        if (d > 1) {
          return Array(this.width).fill(0).map(() => {
            if (d > 2) {
              return Array(this.depth).fill(0).map(() => rand.generate() * this.amplitude);
            }
            return rand.generate() * this.amplitude;
          });
        }
        return rand.generate() * this.amplitude;
      },
    );
  }

  /**
   * Generate a point in 2d noise
   * @param {number} x x position
   * @param {number} y y position
   */
  gen2d(x, y) {
    const { wavelengthx, wavelengthy } = this;

    const normalisedX = x > (this.width * wavelengthx) - 1 ? x % ((this.width) * wavelengthx) : x;
    const normalisedY = y > (this.height * wavelengthy) - 1 ? y % ((this.height) * wavelengthy) : y;

    // get node indices from array closest to supplied position
    const currentNodeX = ~~(normalisedX / wavelengthx);
    const nextNodeX = ~~(normalisedX / wavelengthx) + 1 < this.width
      ? ~~(normalisedX / wavelengthx) + 1
      : 0;
    const currentNodeY = ~~(normalisedY / wavelengthy);
    const nextNodeY = ~~(normalisedY / wavelengthy) + 1 < this.height
      ? ~~(normalisedY / wavelengthy) + 1
      : 0;

    // y is a node
    if (y % wavelengthy === 0) {
      // x is a node
      if (x % wavelengthx === 0) {
        return this.rows[currentNodeY][currentNodeX];
      }
      // between x nodes
      return this.interpolate(
        this.rows[currentNodeY][currentNodeX],
        this.rows[currentNodeY][nextNodeX],
        (x % wavelengthx) / wavelengthx,
      );
    }
    // between y nodes
    if (x % wavelengthx === 0) {
      // x is a node
      return this.interpolate(
        this.rows[currentNodeY][currentNodeX],
        this.rows[nextNodeY][currentNodeX],
        (y % wavelengthy) / wavelengthy,
      );
    }
    // between x nodes
    return this.interpolate(
      this.interpolate(
        this.rows[currentNodeY][currentNodeX],
        this.rows[nextNodeY][currentNodeX],
        (y % wavelengthy) / wavelengthy,
      ),
      this.interpolate(
        this.rows[currentNodeY][nextNodeX],
        this.rows[nextNodeY][nextNodeX],
        (y % wavelengthy) / wavelengthy,
      ),
      (x % wavelengthx) / wavelengthx,
    );
  }

  /**
   * Generate a point in 3d noise
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} z z position
   */
  gen3d(x, y, z) {
    const { wavelengthx, wavelengthy, wavelengthz } = this;

    // normalise coordinate values to points array
    const normalisedX = x > (this.width * wavelengthx) - 1 ? x % ((this.width) * wavelengthx) : x;
    const normalisedY = y > (this.height * wavelengthy) - 1 ? y % ((this.height) * wavelengthy) : y;
    const normalisedZ = z > (this.height * wavelengthz) - 1 ? z % ((this.height) * wavelengthz) : z;

    // get node indices from array closest to supplied position
    const currentNodeX = ~~(normalisedX / wavelengthx);
    const nextNodeX = ~~(normalisedX / wavelengthx) + 1 < this.width
      ? ~~(normalisedX / wavelengthx) + 1
      : 0;
    const currentNodeY = ~~(normalisedY / wavelengthy);
    const nextNodeY = ~~(normalisedY / wavelengthy) + 1 < this.height
      ? ~~(normalisedY / wavelengthy) + 1
      : 0;
    const currentNodeZ = ~~(normalisedZ / wavelengthz);
    const nextNodeZ = ~~(normalisedZ / wavelengthz) + 1 < this.depth
      ? ~~(normalisedZ / wavelengthz) + 1
      : 0;

    // z is a node
    if (z % wavelengthz === 0) {
      // y is a node
      if (y % wavelengthy === 0) {
        // x is a node
        if (x % wavelengthx === 0) {
          return this.rows[currentNodeY][currentNodeX][currentNodeZ];
        }

        // between x nodes
        return this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[currentNodeY][nextNodeX][currentNodeZ],
          (x % wavelengthx) / wavelengthx,
        );
      }

      // between y nodes
      if (x % wavelengthx === 0) {
        // x is a node
        return this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[nextNodeY][currentNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        );
      }

      // between x nodes
      return this.interpolate(

        this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[nextNodeY][currentNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),

        this.interpolate(
          this.rows[currentNodeY][nextNodeX][currentNodeZ],
          this.rows[nextNodeY][nextNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),

        (x % wavelengthx) / wavelengthx,
      );


      // between z nodes
    }

    // y is a node
    if (y % wavelengthy === 0) {
      // x is a node
      if (x % wavelengthx === 0) {
        return this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[currentNodeY][currentNodeX][nextNodeZ],
          (z % wavelengthz) / wavelengthz,
        );
      }
      // between x nodes
      return this.interpolate(

        this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[currentNodeY][nextNodeX][currentNodeZ],
          (x % wavelengthx) / wavelengthx,
        ),

        this.interpolate(
          this.rows[currentNodeY][currentNodeX][nextNodeZ],
          this.rows[currentNodeY][nextNodeX][nextNodeZ],
          (x % wavelengthx) / wavelengthx,
        ),

        (z % wavelengthz) / wavelengthz,
      );
    }
    // between y nodes
    if (x % wavelengthx === 0) {
      // x is a node
      return this.interpolate(
        this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[nextNodeY][currentNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),

        this.interpolate(
          this.rows[currentNodeY][currentNodeX][nextNodeZ],
          this.rows[nextNodeY][currentNodeX][nextNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),

        (z % wavelengthz) / wavelengthz,
      );
    }
    // between x nodes
    return this.interpolate(

      this.interpolate(
        this.interpolate(
          this.rows[currentNodeY][currentNodeX][currentNodeZ],
          this.rows[nextNodeY][currentNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),
        this.interpolate(
          this.rows[currentNodeY][nextNodeX][currentNodeZ],
          this.rows[nextNodeY][nextNodeX][currentNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),
        (x % wavelengthx) / wavelengthx,
      ),

      this.interpolate(
        this.interpolate(
          this.rows[currentNodeY][currentNodeX][nextNodeZ],
          this.rows[nextNodeY][currentNodeX][nextNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),
        this.interpolate(
          this.rows[currentNodeY][nextNodeX][nextNodeZ],
          this.rows[nextNodeY][nextNodeX][nextNodeZ],
          (y % wavelengthy) / wavelengthy,
        ),
        (x % wavelengthx) / wavelengthx,
      ),

      (z % wavelengthz) / wavelengthz,
    );
  }

  /**
   * Generate a point in 2d noise with octaves
   * @param {number} x x position
   * @param {number} y y position
   */
  generate(x, y = 0) {
    let ret = 0;
    let offset = 0;

    // generate each octave and add it
    for (let i = 0; i < this.octaves; i++) {
      const amplitude = this.amplitude / this.octaveIndex ** i;
      const wavelengthx = Math.max(this.wavelengthx / this.octaveIndex ** i, 1);
      const wavelengthy = Math.max(this.wavelengthy / this.octaveIndex ** i, 1);

      ret += this.gen2d(x, y, wavelengthx, wavelengthy, 1) * amplitude;
      offset += 1 / this.octaveIndex ** i;
    }

    return ret / offset;
  }

  generate3d(x, y = 0, z = 0, pixel = 2) {
    let ret = 0;
    let offset = 0;

    // generate each octave and add it
    for (let i = 0; i < this.octaves; i++) {
      const amplitude = this.amplitude / this.octaveIndex ** i;
      const wavelengthx = Math.max(this.wavelengthx / this.octaveIndex ** i, 1);
      const wavelengthy = Math.max(this.wavelengthy / this.octaveIndex ** i, 1);
      const wavelengthz = Math.max(this.wavelengthz / this.octaveIndex ** i, 1);

      ret += this.gen3d(x, y, z, wavelengthx, wavelengthy, wavelengthz * pixel * 2, 1) * amplitude;
      offset += 1 / this.octaveIndex ** i;
    }

    return ret / offset;
  }
}
