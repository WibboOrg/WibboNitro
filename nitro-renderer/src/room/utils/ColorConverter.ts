import { IVector3D, Vector3d } from '../../api';

export class ColorConverter
{
    private static HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    public static hex2rgb(hex: number, out: Array<number> | Float32Array = []): Array<number> | Float32Array
    {
        out[0] = ((hex >> 16) & 0xFF) / 255;
        out[1] = ((hex >> 8) & 0xFF) / 255;
        out[2] = (hex & 0xFF) / 255;

        return out;
    }

    public static hex2rgba(hex: number, out: Array<number> | Float32Array = []): Array<number> | Float32Array
    {
        out[0] = ((hex >> 16) & 0xFF) / 255;
        out[1] = ((hex >> 8) & 0xFF) / 255;
        out[2] = (hex & 0xFF) / 255;
        out[3] = (hex & 0xFF);

        return out;
    }

    public static rgb2hex(rgb: number[] | Float32Array): number
    {
        return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
    }

    public static rgba2hex(rgb: number[] | Float32Array): number
    {
        return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0) + (rgb[3] | 0));
    }

    public static rgbStringToHex(rgb: string): string
    {
        const extracted = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        return '#' + ColorConverter.getHex(extracted[1]) + ColorConverter.getHex(extracted[2]) + ColorConverter.getHex(extracted[3]);
    }

    public static getHex(x: any)
    {
        return isNaN(x) ? '00' : ColorConverter.HEX_DIGITS[(x - x % 16) / 16] + ColorConverter.HEX_DIGITS[x % 16];
    }

    public static int2rgb(color: number): string
    {
        color >>>= 0;
        const b = color & 0xFF;
        const g = (color & 0xFF00) >>> 8;
        const r = (color & 0xFF0000) >>> 16;
        const a = ((color & 0xFF000000) >>> 24) / 255;

        return 'rgba(' + [r, g, b, 1].join(',') + ')';
    }

    public static rgbToHSL(rgb: number): number
    {
        const red = ((rgb >> 16) & 0xFF) / 0xFF;
        const green = ((rgb >> 8) & 0xFF) / 0xFF;
        const blue = (rgb & 0xFF) / 0xFF;

        const maxColor = Math.max(red, green, blue);
        const minColor = Math.min(red, green, blue);
        const colorDiff = maxColor - minColor;

        let hue = 0;
        let saturation = 0;
        const lightness = 0.5 * (maxColor + minColor);

        if(colorDiff !== 0)
        {
            if(maxColor === red)
            {
                hue = 60 * (((green - blue) / colorDiff) % 6);
                if(green < blue)
                {
                    hue += 360;
                }
            }
            else if(maxColor === green)
            {
                hue = 60 * ((blue - red) / colorDiff + 2);
            }
            else if(maxColor === blue)
            {
                hue = 60 * ((red - green) / colorDiff + 4);
            }

            saturation = lightness <= 0.5 ? colorDiff / (2 * lightness) : colorDiff / (2 - 2 * lightness);
        }

        const roundedHue = Math.round((hue / 360) * 0xFF);
        const roundedSaturation = Math.round(saturation * 0xFF);
        const roundedLightness = Math.round(lightness * 0xFF);

        return ((roundedHue << 16) + (roundedSaturation << 8) + roundedLightness);
    }

    public static hslToRGB(hue: number): number
    {
        const saturation = ((hue >> 16) & 0xFF) / 0xFF;
        const lightness = ((hue >> 8) & 0xFF) / 0xFF;
        const intensity = (hue & 0xFF) / 0xFF;

        let red = 0;
        let green = 0;
        let blue = 0;

        if(lightness > 0)
        {
            let temp1 = 0;
            let temp2 = 0;

            if(intensity < 0.5)
            {
                temp1 = intensity * (1 + lightness);
            }
            else
            {
                temp1 = intensity + lightness - intensity * lightness;
            }

            temp2 = 2 * intensity - temp1;

            const hueToRGB = (t: number) =>
            {
                if(t < 0) t += 1;
                if(t > 1) t--;
                if(6 * t < 1) return temp2 + (temp1 - temp2) * 6 * t;
                if(2 * t < 1) return temp1;
                if(3 * t < 2) return temp2 + (temp1 - temp2) * (2 / 3 - t) * 6;
                return temp2;
            };

            red = hueToRGB(saturation + 1 / 3);
            green = hueToRGB(saturation);
            blue = hueToRGB(saturation - 1 / 3);
        }
        else
        {
            red = intensity;
            green = intensity;
            blue = intensity;
        }

        const resultRed = Math.round(red * 0xFF);
        const resultGreen = Math.round(green * 0xFF);
        const resultBlue = Math.round(blue * 0xFF);

        return ((resultRed << 16) + (resultGreen << 8) + resultBlue);
    }

    public static rgb2xyz(k: number): IVector3D
    {
        const red = (k >> 16) & 0xFF / 0xFF;
        const green = (k >> 8) & 0xFF / 0xFF;
        const blue = (k >> 0) & 0xFF / 0xFF;

        const calculateComponent = (component: number) =>
        {
            if(component > 0.04045)
            {
                return Math.pow((component + 0.055) / 1.055, 2.4);
            }
            else
            {
                return component / 12.92;
            }
        };

        const normalizedRed = calculateComponent(red);
        const normalizedGreen = calculateComponent(green);
        const normalizedBlue = calculateComponent(blue);

        const x = (normalizedRed * 100 * 0.4124) + (normalizedGreen * 100 * 0.3576) + (normalizedBlue * 100 * 0.1805);
        const y = (normalizedRed * 100 * 0.2126) + (normalizedGreen * 100 * 0.7152) + (normalizedBlue * 100 * 0.0722);
        const z = (normalizedRed * 100 * 0.0193) + (normalizedGreen * 100 * 0.1192) + (normalizedBlue * 100 * 0.9505);

        return new Vector3d(x, y, z);
    }

    public static xyz2CieLab(k: IVector3D): IVector3D
    {
        const x = k.x / 95.047;
        const y = k.y / 100;
        const z = k.z / 108.883;

        const cubeRoot = (value: number) => value > 0.008856 ? Math.pow(value, (1 / 3)) : (7.787 * value) + (16 / 116);

        const L = (116 * cubeRoot(y)) - 16;
        const a = 500 * (cubeRoot(x) - cubeRoot(y));
        const b = 200 * (cubeRoot(y) - cubeRoot(z));

        return new Vector3d(L, a, b);
    }

    public static rgb2CieLab(k: number): IVector3D
    {
        return ColorConverter.xyz2CieLab(ColorConverter.rgb2xyz(k));
    }

    public static colorize(colorA: number, colorB: number): number
    {
        if(colorB === 0xFFFFFFFF) return colorA;

        let r = ((colorB >> 16) & 0xFF);
        let g = ((colorB >> 8) & 0xFF);
        let b = (colorB & 0xFF);

        r = ((((colorA >> 16) & 0xFF) * r) / 0xFF);
        g = ((((colorA >> 8) & 0xFF) * g) / 0xFF);
        b = (((colorA & 0xFF) * b) / 0xFF);

        return ((colorA && 0xFF000000) | (r << 16) | (g << 8) | b);
    }
}
