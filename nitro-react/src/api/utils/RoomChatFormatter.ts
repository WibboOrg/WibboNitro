import joypixels from 'emojione';

const allowedColours: Map<string, string> = new Map();

allowedColours.set('r', 'red');
allowedColours.set('b', 'blue');
allowedColours.set('g', 'green');
allowedColours.set('y', 'yellow');
allowedColours.set('w', 'white');
allowedColours.set('o', 'orange');
allowedColours.set('c', 'cyan');
allowedColours.set('br', 'brown');
allowedColours.set('pr', 'purple');
allowedColours.set('pk', 'pink');

allowedColours.set('aliceblue', 'aliceblue');
allowedColours.set('antiquewhite', 'antiquewhite');
allowedColours.set('aqua', 'aqua');
allowedColours.set('aquamarine', 'aquamarine');
allowedColours.set('azure', 'azure');
allowedColours.set('beige', 'beige');
allowedColours.set('bisque', 'bisque');
allowedColours.set('black', 'black');
allowedColours.set('blanchedalmond', 'blanchedalmond');
allowedColours.set('blue', 'blue');
allowedColours.set('blueviolet', 'blueviolet');
allowedColours.set('brown', 'brown');
allowedColours.set('burlywood', 'burlywood');
allowedColours.set('cadetblue', 'cadetblue');
allowedColours.set('chartreuse', 'chartreuse');
allowedColours.set('chocolate', 'chocolate');
allowedColours.set('coral', 'coral');
allowedColours.set('cornflowerblue', 'cornflowerblue');
allowedColours.set('cornsilk', 'cornsilk');
allowedColours.set('crimson', 'crimson');
allowedColours.set('cyan', 'cyan');
allowedColours.set('darkblue', 'darkblue');
allowedColours.set('darkcyan', 'darkcyan');
allowedColours.set('darkgoldenrod', 'darkgoldenrod');
allowedColours.set('darkgrey', 'darkgrey');
allowedColours.set('darkgreen', 'darkgreen');
allowedColours.set('darkkhaki', 'darkkhaki');
allowedColours.set('darkmagenta', 'darkmagenta');
allowedColours.set('darkolivegreen', 'darkolivegreen');
allowedColours.set('darkorange', 'darkorange');
allowedColours.set('darkorchid', 'darkorchid');
allowedColours.set('darkred', 'darkred');
allowedColours.set('darksalmon', 'darksalmon');
allowedColours.set('darkseagreen', 'darkseagreen');
allowedColours.set('darkslateblue', 'darkslateblue');
allowedColours.set('darkslategrey', 'darkslategrey');
allowedColours.set('darkturquoise', 'darkturquoise');
allowedColours.set('darkviolet', 'darkviolet');
allowedColours.set('deeppink', 'deeppink');
allowedColours.set('deepskyblue', 'deepskyblue');
allowedColours.set('dimgray', 'dimgray');
allowedColours.set('dodgerblue', 'dodgerblue');
allowedColours.set('firebrick', 'firebrick');
allowedColours.set('floralwhite', 'floralwhite');
allowedColours.set('forestgreen', 'forestgreen');
allowedColours.set('fuchsia', 'fuchsia');
allowedColours.set('gainsboro', 'gainsboro');
allowedColours.set('ghostwhite', 'ghostwhite');
allowedColours.set('gold', 'gold');
allowedColours.set('goldenrod', 'goldenrod');
allowedColours.set('grey', 'grey');
allowedColours.set('green', 'green');
allowedColours.set('greenyellow', 'greenyellow');
allowedColours.set('honeydew', 'honeydew');
allowedColours.set('hotpink', 'hotpink');
allowedColours.set('indianred', 'indianred');
allowedColours.set('indigo', 'indigo');
allowedColours.set('ivory', 'ivory');
allowedColours.set('khaki', 'khaki');
allowedColours.set('lavender', 'lavender');
allowedColours.set('lavenderblush', 'lavenderblush');
allowedColours.set('lawngreen', 'lawngreen');
allowedColours.set('lemonchiffon', 'lemonchiffon');
allowedColours.set('lightblue', 'lightblue');
allowedColours.set('lightcoral', 'lightcoral');
allowedColours.set('lightcyan', 'lightcyan');
allowedColours.set('lightgoldenrodyellow', 'lightgoldenrodyellow');
allowedColours.set('lightgrey', 'lightgrey');
allowedColours.set('lightgreen', 'lightgreen');
allowedColours.set('lightpink', 'lightpink');
allowedColours.set('lightsalmon', 'lightsalmon');
allowedColours.set('lightseagreen', 'lightseagreen');
allowedColours.set('lightskyblue', 'lightskyblue');
allowedColours.set('lightslategrey', 'lightslategrey');
allowedColours.set('lightsteelblue', 'lightsteelblue');
allowedColours.set('lightyellow', 'lightyellow');
allowedColours.set('lime', 'lime');
allowedColours.set('limegreen', 'limegreen');
allowedColours.set('linen', 'linen');
allowedColours.set('magenta', 'magenta');
allowedColours.set('maroon', 'maroon');
allowedColours.set('mediumaquamarine', 'mediumaquamarine');
allowedColours.set('mediumblue', 'mediumblue');
allowedColours.set('mediumorchid', 'mediumorchid');
allowedColours.set('mediumpurple', 'mediumpurple');
allowedColours.set('mediumseagreen', 'mediumseagreen');
allowedColours.set('mediumslateblue', 'mediumslateblue');
allowedColours.set('mediumspringgreen', 'mediumspringgreen');
allowedColours.set('mediumturquoise', 'mediumturquoise');
allowedColours.set('mediumvioletred', 'mediumvioletred');
allowedColours.set('midnightblue', 'midnightblue');
allowedColours.set('mintcream', 'mintcream');
allowedColours.set('mistyrose', 'mistyrose');
allowedColours.set('moccasin', 'moccasin');
allowedColours.set('navajowhite', 'navajowhite');
allowedColours.set('navy', 'navy');
allowedColours.set('oldlace', 'oldlace');
allowedColours.set('olive', 'olive');
allowedColours.set('olivedrab', 'olivedrab');
allowedColours.set('orange', 'orange');
allowedColours.set('orangered', 'orangered');
allowedColours.set('orchid', 'orchid');
allowedColours.set('palegoldenrod', 'palegoldenrod');
allowedColours.set('palegreen', 'palegreen');
allowedColours.set('paleturquoise', 'paleturquoise');
allowedColours.set('palevioletred', 'palevioletred');
allowedColours.set('papayawhip', 'papayawhip');
allowedColours.set('peachpuff', 'peachpuff');
allowedColours.set('peru', 'peru');
allowedColours.set('pink', 'pink');
allowedColours.set('plum', 'plum');
allowedColours.set('powderblue', 'powderblue');
allowedColours.set('purple', 'purple');
allowedColours.set('red', 'red');
allowedColours.set('rosybrown', 'rosybrown');
allowedColours.set('royalblue', 'royalblue');
allowedColours.set('saddlebrown', 'saddlebrown');
allowedColours.set('salmon', 'salmon');
allowedColours.set('sandybrown', 'sandybrown');
allowedColours.set('seagreen', 'seagreen');
allowedColours.set('seashell', 'seashell');
allowedColours.set('sienna', 'sienna');
allowedColours.set('silver', 'silver');
allowedColours.set('skyblue', 'skyblue');
allowedColours.set('slateblue', 'slateblue');
allowedColours.set('slategrey', 'slategrey');
allowedColours.set('snow', 'snow');
allowedColours.set('springgreen', 'springgreen');
allowedColours.set('steelblue', 'steelblue');
allowedColours.set('tan', 'tan');
allowedColours.set('teal', 'teal');
allowedColours.set('thistle', 'thistle');
allowedColours.set('tomato', 'tomato');
allowedColours.set('turquoise', 'turquoise');
allowedColours.set('violet', 'violet');
allowedColours.set('wheat', 'wheat');
allowedColours.set('white', 'white');
allowedColours.set('whitesmoke', 'whitesmoke');
allowedColours.set('yellow', 'yellow');
allowedColours.set('yellowgreen', 'yellowgreen');

const encodeHTML = (str: string) =>
{
    return str.replace(/([\u00A0-\u9999<>&])(.|$)/g, (full, char, next) =>
    {
        if(char !== '&' || next !== '#')
        {
            if(/[\u00A0-\u9999<>&]/.test(next)) next = '&#' + next.charCodeAt(0) + ';';

            return '&#' + char.charCodeAt(0) + ';' + next;
        }

        return full;
    });
}

export const RoomChatFormatter = (content: string) =>
{
    let result = '';

    content = encodeHTML(content);
    content = (joypixels.shortnameToUnicode(content) as string)
    content = content.replace(/\[tag\](.*?)\[\/tag\]/g, '<span class="chat-tag"><b>$1</b></span>');
    content = content.replace(/(?:http:\/\/|https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?.*v=|shorts\/)?([\w-]+)/g, '<a href="https://youtu.be/$1" target="_blank">$&</a>');

    if(content.startsWith('@') && content.indexOf('@', 1) > -1)
    {
        let match = null;

        while((match = /@[a-zA-Z]+@/g.exec(content)) !== null)
        {
            const colorTag = match[0].toString();
            const colorName = colorTag.substr(1, colorTag.length - 2);
            const text = content.replace(colorTag, '');

            if(!allowedColours.has(colorName))
            {
                result = text;
            }
            else
            {
                const color = allowedColours.get(colorName);
                result = '<span style="color: ' + color + '">' + text + '</span>';
            }
            break;
        }
    }
    else
    {
        result = content;
    }

    return result;
}
