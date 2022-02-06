// #include <iostream>
// using std::cout;

#include <complex>
#include <emscripten/emscripten.h>

using std::complex;
// using namespace std::complex_literals;

// for export with emscripten
// https://stackoverflow.com/a/63879243
extern "C" {
	void calcPlane(double lx, double rx, int width, int height, short* result);
}

const int R = 2, N = 100;
const complex<double> z0 = 0;

EMSCRIPTEN_KEEPALIVE
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
EMSCRIPTEN_KEEPALIVE
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

	// int* result = new int[width * height];

	double x, y;

	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			x = lx + i / scale;
			y = ty - j / scale;

			result[i + j * width] = checkSeries(x, y);
		}
	}

	// return result;
}

// uncomment to test
/*int main() {
	int width = 1600, height = 717;
	// left and right x coord
	double lx = -2, rx = 1;

	int * res = calcPlane(lx, rx, width, height);

	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			cout << "(" << i << ", " << j << "): "
				<< res[i + j * width] << '\n';
		}
	}

	cout << '\n';
}*/
