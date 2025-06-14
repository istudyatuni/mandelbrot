use malachite::{
    base::num::basic::traits::{One, Two, Zero},
    rational::Rational,
};
use num_complex::Complex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Mandelbrot {
    pixel_steps: Vec<u32>,
    pixels_count: usize,
}

/// 2^2
const ESCAPE_MODULUS: f64 = 4.0;
/// complex zero
const Z0: Complex<Rational> = Complex::new(Rational::ZERO, Rational::ZERO);

const IS_IN: u32 = 0;

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(pixels_count: usize) -> Self {
        #[cfg(feature = "debug")]
        console_error_panic_hook::set_once();

        Self {
            pixel_steps: vec![0; pixels_count],
            pixels_count,
        }
    }

    /// Calculate mandelbrot plane for given parameters for each pixel on plane
    ///
    /// Plane is from JS canvas:
    ///
    /// ```
    /// --------------> x
    /// |
    /// |
    /// v
    ///
    /// y
    /// ```
    ///
    /// We made projection of complex plane to canvas plane.
    ///
    /// # Arguments
    ///
    /// * `lx` - Left coordinate of x axis (complex plane)
    /// * `rx` - Right coordinate of x axis (complex plane)
    /// * `yc` - Center of y axis (complex plane)
    /// * `w` - Width of display (canvas plane) - how many points to calculate
    /// * `h` - Height of display (canvas plane)
    /// * `depth` - Number of iterations
    pub fn calc(&mut self, lx: f64, rx: f64, yc: f64, w: u16, h: u16, depth: u32) {
        let lx = to_rational(lx);
        let rx = to_rational(rx);
        let yc = to_rational(yc);
        let w = Rational::from(w);
        let h = Rational::from(h);

        // total width of x axis (complex plane)
        let xwidth = rx - &lx;

        // scale coefficient between complex plane and canvas
        let scale = &w / xwidth;

        // complex height of y axis
        let yheight = h / &scale;

        // top complex y coordinate
        let ty = yc + (yheight / Rational::TWO);

        // x display, y display
        let (mut xd, mut yd);

        for i in 0..self.pixels_count {
            let i_r = Rational::from(i);

            yd = &i_r / &w;
            xd = i_r - &yd; // i_r % w
            self.pixel_steps[i] = check_series(&lx + xd / &scale, &ty - yd / &scale, depth);
        }
    }

    pub fn pixel_steps(&self) -> *const u32 {
        self.pixel_steps.as_ptr()
    }
}

fn check_series(x: Rational, i: Rational, depth: u32) -> u32 {
    if check_cardioid(&x, &i) {
        return IS_IN;
    }

    let point = Complex::new(x, i);
    let mut num = rational_sum(&Z0, &point.clone());

    for step in 0..depth {
        // do not calculate square root
        if &num.re * &num.re + &num.im * &num.im >= ESCAPE_MODULUS {
            return step;
        }

        num = rational_sum(&rational_pow2(num), &point);
    }

    IS_IN
}

fn check_cardioid(x: &Rational, i: &Rational) -> bool {
    let r16 = Rational::from(16);
    let r1_4 = Rational::from_unsigneds(1u32, 4u32);

    let a4 = x - &r1_4;
    let b2 = i * i;
    let q = &a4 * &a4 + &b2;

    let x = x + Rational::ONE;

    // cardioid or circle to the left of cardioid
    (&q * (&q + a4) < &b2 * r1_4) || (&x * &x + b2 < Rational::ONE / r16)
}

fn to_rational(f: f64) -> Rational {
    Rational::from_sci_string_simplest(&f.to_string()).unwrap()
}

fn rational_pow2(n: Complex<Rational>) -> Complex<Rational> {
    // (a + bi) * (c + di) = (ac - bd) + (ad - bc)i
    let ac_bd = &n.re * &n.re - &n.im * &n.im;
    // let ad_bc = &n.re * &n.im - &n.im * &n.re;

    Complex::new(ac_bd, Rational::ZERO)
}

fn rational_sum(a: &Complex<Rational>, b: &Complex<Rational>) -> Complex<Rational> {
    Complex::new(&a.re + &b.re, &a.im + &b.im)
}
