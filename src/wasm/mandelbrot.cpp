/**
 * #ifdef __EMSCRIPTEN__ for building with emsdk
 * #ifndef __EMSCRIPTEN__ for local testing
 */

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
	void calcPlane(double lx, double rx, int width, int height, unsigned short* result);
}
#endif

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
bool checkCardioid(double x, double i) {
	double a4 = x - 0.25,
		b2 = i * i;
	double q = a4 * a4 + b2;

	// cardioid
	if (q * (q + a4) < b2 * 0.25) {
		return true;
	}

	double x1 = x + 1;

	// circle to the left of cardioid
	if (x1 * x1 + b2 < 1/16) {
		return true;
	}

	return false;
}

const int R = 2, N = 100;
const complex<double> z0 = 0;

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
unsigned short checkSeries(double x, double i) {
	if (checkCardioid(x, i)) {
		return 1;
	}

	complex<double> point = complex<double>(x, i);
	complex<double> num = z0 + point;

	for (int i = 0; i < N; i++) {
		if (std::abs(num) >= R) {
			return 0;
		}

		num = std::pow(num, 2) + point;
	}

	return 1;
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
void calcPlane(double lx, double rx, int width, int height, unsigned short* result) {
	// total width of x axis (complex plane)
	double xwidth = rx - lx;

	// scale coefficient between complex plane and canvas
	double scale = width / xwidth;

	// height of y axis
	double yheight = height / scale;

	// top and down y coordinate
	// now hardcode, y axis on canvas center
	double ty = yheight / 2, dy = yheight / 2;

	// x display, y display
	int xd, yd;

	for (int i = 0; i < width * height; i++) {
		xd = i % width;
		yd = i / width;
		result[i] = checkSeries(lx + xd / scale, ty - yd / scale);
	}
}

#ifndef __EMSCRIPTEN__
int main() {
	int width = 1600, height = 717;
	// left and right x coord
	double lx = -5, rx = 3;

	unsigned short* res = new unsigned short[width * height];
	calcPlane(lx, rx, width, height, res);

	for (int i = 0; i < width * height; i++) {
		cout << res[i] << ' ';
	}

	/*for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			cout << res[i + j * width] << ' ';
			// cout << "(" << i << ", " << j << "): " << res[i + j * width] << '\n';
		}
	}*/

	cout << '\n';
}
#endif
