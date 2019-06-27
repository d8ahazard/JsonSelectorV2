$(function(){
    var cookie = getCookie('jsonData');
    if (cookie !== null) {
        console.log("Got a cookie: " + cookie);
        $('#jsonInput').val(cookie);
    }

    var getJson = findGetParameter('json');
    if (getJson !== null) {
        getJson = decodeURIComponent(getJson);
        $('#jsonInput').val(getJson);
        processInput();
    }

    $('#process').click(function(){
        processInput();
    });

    $('#clear').click(function() {
       clearInput();
    });

    $(document).on('click', '.value', function() {
        var sel2 = $(this).attr('data-selector');
       console.log("Value click: " + sel2);
       $('#selectorBox').html(sel2);
       return false;
    });


    $(document).on('dblclick', '#selectorBox', function() {
        console.log("Doubleclick!");
        var selector = $(this).text();
        var textArea = document.createElement("textarea");
        textArea.value = selector;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        showCopied("Selector coped to clipboard.");
    });


    $(document).on('dblclick', '.value, #treeBody', function() {
        console.log("Doubleclick!");
        var typeString = ($(this).hasClass('value')) ? 'Value' : 'JSON';
        var selector = $(this).text().replace(/,\s*$/, "");
        var textArea = document.createElement("textarea");
        textArea.value = selector;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        showCopied(typeString + " copied to clipboard.");
        return false;
    });

});

function showCopied(msg) {
    var cm = $('.copiedModal');
    cm.html(msg);
    cm.fadeIn();
    setTimeout(function(){
        $('.copiedModal').fadeOut();
    }, 2000);
}

function processInput() {
    var json = $('#jsonInput').val();
    console.log("JSON is " + json);
    var data = validateJSON(json);
    if (data) {
        console.log("JSON IS VALID: ", data);
        setCookie("jsonData", JSON.stringify(data),1);
        formatTree(data);
    } else {
        console.log("Invalid JSON");
    }
}

function clearInput() {
    setCookie("jsonData","",1);
    $('#treeCard').slideUp();
    $('#inputCard').slideDown();
    $('#treeBody').html("");
    $('#jsonInput').val("");
}

function validateJSON(json) {
    try {
        var jsonArray = JSON.parse(json);
    } catch (e) {
        return false;
    }
    return jsonArray;
}

function formatTree(json) {
    var loop = loopTree(json, 1, false);
    console.log("Loop: ", loop);
    var type = $.type(json);
    console.log("DataType is " + type);
    var charString = $.type(json) === 'array' ? "[" + loop + "]" : "{" + loop + "}";
    $('#treeBody').html(charString);
    $('#treeCard').slideDown();
    $('#inputCard').slideUp();
}

function loopTree(json, count, parent) {
    console.log("Count is " + count);
    var out = "";
    var i = 1;
    var len = Object.keys(json).length;
    console.log("Len is " + len);
    $.each(json, function(key, data) {
        var subKey = "";
        var pSel = "";
        var comma = "";
        var keyString = (typeof(key) === 'string') ? '"' + key + '": ' : "";
        var keyQuote = (typeof(key) === 'string') ? '"' + key + '"' : key;
    if (parent) {
        pSel = parent + "[" + keyQuote + "]";
    } else {
        pSel = "[" + keyQuote + "]";
    }
        console.log("Type for "+ key +" is " + $.type(data));
        if ($.type(data) === 'object') {
            console.log("This is an array object.");
            count += 1;
            subKey += " {" + loopTree(data, count, pSel) + "}";
            count -= 1;
        } else if ($.type(data) === 'array') {
            console.log("This is an array.");
            count += 1;
            subKey += " [" + loopTree(data, count, pSel) + "]";
            count -= 1;
        } else {
            console.log("This is a string.");
            subKey += '"' + data + '"';
        }
        if (len > i) comma = ", ";
        if ($.type(data) === 'object' || $.type(data) === 'array') {
            pSel = "<div class='value' data-selector='" + pSel + "'>" + subKey + comma + "</div>"
        } else {
            pSel = "<span class='value' data-selector='" + pSel + "'>" + subKey + comma + "</span>"
        }

        out += "<div class='treeItem tab" + count + "'>" + keyString + pSel + "</div>";
        i++;
    });
    return out;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function rtrim(stringToTrim) {

    return stringToTrim.replace(/\s+$/,"");

}
