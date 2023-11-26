export const BbCode = (text: string) =>
{
    text = text.replace(new RegExp('\\<', 'igm'), '&lt;');
    text = text.replace(new RegExp('\\>', 'igm'), '&gt;');
    return bbcodeList.reduce((text, code) => text.replace(code.regexp, code.replacement), text);
};

const bbcodeList = [
    { regexp: new RegExp('\\r', 'igm'), replacement: '' },
    { regexp: new RegExp('\\n', 'igm'), replacement: '<br />' },
    { regexp: new RegExp('\\[br\\]', 'igm'), replacement: '<br />' },
    { regexp: new RegExp('\\[b\\](.+?)\\[/b\\]', 'igm'), replacement: '<b>$1</b>' },
    { regexp: new RegExp('\\[center\\](.*?)\\[/center\\]', 'igm'), replacement: '<div class="center">$1</div>' },
    { regexp: new RegExp('\\[i\\](.*?)\\[/i\\]', 'igm'), replacement: '<em>$1</em>' },
    { regexp: new RegExp('\\[u\\](.*?)\\[/u\\]', 'igm'), replacement: '<u>$1</u>' },
    { regexp: new RegExp('\\[s\\](.*?)\\[/s\\]', 'igm'), replacement: '<s>$1</s>' },
    { regexp: new RegExp('\\[url\\=http(.*?)\](.*?)\\[/url\\]', 'igm'), replacement: '<a href="http$1" target="_bank">$2</a>' },
    { regexp: new RegExp('\\[url\\](.*?)\\[/url\\]', 'igm'), replacement: '<a href="$1" target="_bank">$1</a>' },
    { regexp: new RegExp('\\[color\\=(.*?)\](.*?)\\[/color\\]', 'igm'), replacement: '<font color="$1">$2</font>' },
    { regexp: new RegExp('\\[size=small\\](.*?)\\[/size\\]', 'igm'), replacement: '<small>$1</small>' },
    { regexp: new RegExp('\\[size=large\\](.*?)\\[/size\\]', 'igm'), replacement: '<h5>$1</h5>' },
    { regexp: new RegExp('\\[code\\](.*?)\\[/code\\]', 'igm'), replacement: '<pre>$1</pre>' },
    { regexp: new RegExp('\\[img\\](http\\:|https\\:)(.*?)\\[/img\\]', 'igm'), replacement: '<img src="$2" class="max-w-full">' },
    { regexp: new RegExp('\\[youtube\\](.+)?watch?(.+)?v=(.+)(&.+)?\\[/youtube\\]', 'igm'), replacement: '<iframe width="100%" height="400" src="//www.youtube.com/embed/$3" frameborder="0" allowfullscreen></iframe>' },
    { regexp: new RegExp('\\<br\\>', 'igm'), replacement: '\n' }
];
