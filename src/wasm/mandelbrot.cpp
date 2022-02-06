// for testing
#ifndef __EMSCRIPTEN__
#include <iostream>
using std::cout;
#endif

#include <complex>

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#endif

using std::complex;
// using namespace std::complex_literals;

#ifdef __EMSCRIPTEN__
// for export with emscripten
// https://stackoverflow.com/a/63879243
extern "C" {
	void calcPlane(double lx, double rx, int width, int height, short* result);
}
#endif

const int R = 2, N = 100;
const complex<double> z0 = 0;

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
bool checkSeries(double x, double i) {
	complex<double> point = complex<double>(x, i);
	complex<double> num = z0 + point;

	for (int i = 0; i < N; i++) {
		if (std::abs(num) >= R) {
			return false;
		}

		num = std::pow(num, 2) * point;
	}

	return true;
}

/**
 * Calculate mandelbrot plane for given parameters for each pixel on plane
 *
 * Plane is from JS canvas:
 *
 * ```
 * --------------> x
 * |
 * |
 * v
 *
 * y
 * ```
 *
 * We made projection of complex plane to canvas plane.
 *
 * @param  lx     Left coordinate of x axis (complex plane)
 * @param  rx     Right coordinate of x axis (complex plane)
 * @param  width  Width of display (canvas plane) - how many points to calculate
 * @param  height Height of display (canvas plane)
 * @return        Array with result
 */
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
void calcPlane(double lx, double rx, int width, int height, short* result) {
	// total width of x axis (complex plane)
	double xwidth = std::abs(lx) + std::abs(rx);

	// scale coefficient between complex plane and canvas
	double scale = width / xwidth;

	// height of y axis
	double yheight = height / scale;

	// top and down y coordinate
	// now hardcode, y axis on canvas center
	double ty = yheight / 2, dy = yheight / 2;

	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			result[i + j * width] = checkSeries(lx + i / scale, ty - j / scale);
		}
	}
}

// for testing
#ifndef __EMSCRIPTEN__
int main() {
	int width = 1600, height = 717;
	// left and right x coord
	double lx = -2, rx = 1;

	short* res = new short[width * height];
	calcPlane(lx, rx, width, height, res);

	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			cout << res[i + j * width] << ' ';
			// cout << "(" << i << ", " << j << "): " << res[i + j * width] << '\n';
		}
	}

	cout << '\n';
}
#endif
