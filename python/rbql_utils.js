function split_escaped_csv_str(src) {
    if (src.indexOf('"') == -1)
        return [src.split(','), false];
    var result = [];
    var warning = false;
    var cidx = 0;
    while (cidx < src.length) {
        if (src.charAt(cidx) === '"') {
            var uidx = cidx + 1;
            while (true) {
                uidx = src.indexOf('"', uidx);
                if (uidx == -1) {
                    result.push(src.substring(cidx + 1).replace(/""/g, '"'));
                    return [result, true];
                } else if (uidx + 1 >= src.length || src.charAt(uidx + 1) == ',') {
                    result.push(src.substring(cidx + 1, uidx).replace(/""/g, '"'));
                    cidx = uidx + 2;
                    break;
                } else if (src.charAt(uidx + 1) == '"') {
                    uidx += 2; 
                    continue;
                } else {
                    warning = true;
                    uidx += 1;
                    continue;
                }
            }
        } else {
            var uidx = src.indexOf(',', cidx);
            if (uidx == -1)
                uidx = src.length;
            var field = src.substring(cidx, uidx);
            if (field.indexOf('"') != -1)
                warning = true;
            result.push(field);
            cidx = uidx + 1;
        }
    }
    if (src.charAt(src.length - 1) == ',')
        result.push('');
    return [result, warning];
}

module.exports.split_escaped_csv_str = split_escaped_csv_str;
