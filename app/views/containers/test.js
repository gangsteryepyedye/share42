(function (b, a) {
    b.log = function (c) {
        if (typeof console !== "undefined" && typeof console.log !== "undefined") {
            console.log(c)
        }
    };
    b.appendTwitterButton = function (g, d, f) {
        f = f || {};
        var c = document.createElement("a");
        c.href = "https://twitter.com/share";
        c.className = "twitter-share-button";
        if (g) {
            c.setAttribute("data-url", g)
        }
        c.setAttribute("data-count", "none");
        c.setAttribute("data-lang", "en");
        if (f.text) {
            c.setAttribute("data-text", f.text)
        }
        if (f.mentionTBF) {
            c.setAttribute("data-via", "TransferBigFile")
        }
        c.innerText = c.textContent = "Tweet";
        var e = document.createElement("div");
        e.appendChild(c);
        d.appendChild(e);
        if (window.twttr && window.twttr.widgets && window.twttr.widgets.load) {
            window.twttr.widgets.load()
        } else {
            window.twttr = (function (h, m, k) {
                var n, l, j = h.getElementsByTagName(m)[0];
                if (h.getElementById(k)) {
                    return
                }
                l = h.createElement(m);
                l.id = k;
                l.src = "//platform.twitter.com/widgets.js";
                j.parentNode.insertBefore(l, j);
                return window.twttr || (n = {
                    _e: [],
                    ready: function (o) {
                        n._e.push(o)
                    }
                })
            }(document, "script", "twitter-wjs"));
            twttr.ready(function (h) {
                b.trackTwitter()
            })
        }
    };
    b.appendFacebookButton = function (g, c) {
        var e = document.createElement("div");
        e.className = "fb-send";
        if (g) {
            e.setAttribute("data-href", g)
        }
        var f = document.createElement("div");
        f.appendChild(e);
        c.appendChild(f);
        if (typeof FB !== "undefined" && typeof FB.XFBML !== "undefined") {
            FB.XFBML.parse(f)
        }
    };
    b.appendGooglePlusButton = function (g, c) {
        var e = document.createElement("div");
        e.className = "g-plusone";
        e.setAttribute("data-size", "medium");
        e.setAttribute("data-annotation", "none");
        if (g) {
            e.setAttribute("data-href", g)
        }
        var f = document.createElement("div");
        f.appendChild(e);
        c.appendChild(f);
        if (typeof gapi !== "undefined" && typeof gapi.plusone !== "undefined" && typeof gapi.plusone.go !== "undefined") {
            gapi.plusone.go(f)
        }
    };
    b.shareDownloadLink = function (d, c) {
        if (!d) {
            d = location.href
        }
        var c = c || document.getElementById("share-buttons");
        if (c) {
            this.appendFacebookButton(d, c);
            this.appendTwitterButton(d, c, {
                text: "Download my files",
                mentionTBF: true
            });
            this.appendGooglePlusButton(d, c)
        }
    };
    b.equalHeight = function (c) {
        if (!(c instanceof jQuery)) {
            c = a(c)
        }
        var d = 0;
        c.each(function () {
            var e = a(this).height();
            if (e > d) {
                d = e
            }
        });
        c.height(d)
    };
    b.disable = function (c) {
        if (!c) {
            c = "body"
        }
        if (!(c instanceof jQuery)) {
            c = a(c)
        }
        if (!c.is(":checkbox[data-enabler-for]")) {
            c = c.find(":checkbox[data-enabler-for]")
        }
        c.each(function () {
            var d = a(this).data("enabler-for");
            if (d) {
                if (a(this).is(":checked")) {
                    a(d).removeClass("ui-state-disabled").find("input, textarea, select, button").removeAttr("disabled")
                } else {
                    a(d).addClass("ui-state-disabled").find("input, textarea, select, button").attr("disabled", "disabled")
                }
            }
        })
    };
    b.styleButtons = function (c) {
        if (!c) {
            c = "body"
        }
        if (!(c instanceof jQuery)) {
            c = a(c)
        }
        c.find(".button").button()
    };
    b.fadeIn = function (c) {
        if (!c) {
            c = "body"
        }
        if (!(c instanceof jQuery)) {
            c = a(c)
        }
        c.find(".fade-in").css({
            opacity: 0,
            visibility: "visible"
        }).fadeTo(250, 1)
    };
    b.displayError = function (e, f, g) {
        var d = g || 400,
            c = a('<div class="ui-widget">' + e + "</div>");
        c.dialog({
            modal: true,
            title: f,
            width: d,
            buttons: {
                Ok: function () {
                    a(this).dialog("close")
                }
            }
        });
        return false
    };
    b.displayAjaxError = function (e) {
        var c, d;
        if (e.readyState == 0 || e.status == 0) {
            return
        } else {
            if (e.status == 400) {
                d = a.parseJSON(e.responseText);
                if (!d || !d.ValidationErrors) {
                    return
                }
                c = '<div class="ui-state-error">';
                a.each(d.ValidationErrors, function (f, g) {
                    c += "<div>" + g.Error + "</div>"
                });
                c += "</div>"
            } else {
                c = "An error occurred processing your request."
            }
        }
        b.displayError(c, "Oops, an error occurred.")
    };
    b.watermark = function (c) {
        if (!("placeholder" in document.createElement("input"))) {
            if (!c) {
                c = "body"
            }
            if (!(c instanceof jQuery)) {
                c = a(c)
            }
            c.find("[placeholder]").each(function () {
                a(this).watermark(a(this).attr("placeholder"), "watermark")
            })
        }
    };
    b.formatCurrency = function (f, d) {
        f = f.toString().replace(/\$|\,/g, "");
        if (isNaN(f)) {
            f = "0"
        }
        var g = (f == (f = Math.abs(f)));
        f = Math.floor(f * 100 + 0.50000000001);
        var c = f % 100;
        f = Math.floor(f / 100).toString();
        if (c < 10) {
            c = "0" + c
        }
        for (var e = 0; e < Math.floor((f.length - (1 + e)) / 3); e++) {
            f = f.substring(0, f.length - (4 * e + 3)) + "," + f.substring(f.length - (4 * e + 3))
        }
        if (d && c == "00") {
            return (((g) ? "" : "-") + "$" + f)
        } else {
            return (((g) ? "" : "-") + "$" + f + "." + c)
        }
    };
    b.formatSize = function (f) {
        var g = [" B", " KB", " MB", " GB"];
        for (var d = 0, e = g.length; d < e; d++) {
            if (f < 1024 || d == e - 1) {
                var c = Math.pow(10, 1);
                f = Math.floor(f * c) / c;
                return (f.toFixed(1)).toString() + g[d]
            }
            f /= 1024
        }
        return ""
    };
    b.pinifySite = function () {
        if (!navigator.userAgent.toLowerCase().match(/msie (9|10)(\.?[0-9]*)*/)) {
            return
        }
        if (!a.pinify.isPinned() && window.localStorage && window.localStorage.getItem("hidepinnedsite") != "true") {
            var c = a('<div class="pinify-container"><img src="/favicon.ico" class="msPinSite"/><div class="pinify-content">Drag the icon to your taskbar to experience TransferBigFiles.com as a Pinned Site.</div><div class="pinify-closer"></div></div>');
            a("body").prepend(c);
            c.find("img.msPinSite").pinify("enablePinning").end().find(".pinify-closer").click(function () {
                a(this).parent().slideUp("slow").fadeOut("slow");
                window.localStorage && window.localStorage.setItem("hidepinnedsite", true)
            }).end()
        }
        a("head").pinify({
            applicationName: "TransferBigFiles",
            favIcon: "https://" + location.host + "/favicon.ico",
            startUrl: "https://" + location.host + "?utm_source=ie9&utm_medium=jumplist&utm_campaign=pinned-ie9",
            tasks: [{
                name: "New Transfer",
                action: "https://" + location.host + "/?utm_source=ie9&utm_medium=jumplist&utm_campaign=pinned-ie9",
                icon: "https://" + location.host + "/favicon.ico"
            }, {
                name: "View Sent Transfers",
                action: "https://" + location.host + "/sent?utm_source=ie9&utm_medium=jumplist&utm_campaign=pinned-ie9",
                icon: "https://" + location.host + "/favicon.ico"
            }, {
                name: "View Received Transfers",
                action: "https://" + location.host + "/received?utm_source=ie9&utm_medium=jumplist&utm_campaign=pinned-ie9",
                icon: "https://" + location.host + "/favicon.ico"
            }, {
                name: "Manage Account",
                action: "https://" + location.host + "/account?utm_source=ie9&utm_medium=jumplist&utm_campaign=pinned-ie9",
                icon: "https://" + location.host + "/favicon.ico"
            }]
        })
    };
    b.trackEvent = function (d, c, f, g) {
        var e;
        if (f && g) {
            e = ["_trackEvent", d, c, f, g]
        } else {
            if (f || g) {
                e = ["_trackEvent", d, c, f || g]
            } else {
                e = ["_trackEvent", d, c]
            }
        }
        if (location.host.indexOf("www") !== 0) {
            b.log(e);
            return
        }
        if (!window._gaq || !d || !c) {
            return
        }
        _gaq.push(e)
    };
    b.trackPageview = function (d) {
        var c = ["_trackPageview", d];
        if (location.host.indexOf("www") !== 0) {
            b.log(c);
            return
        }
        if (!window._gaq || !d) {
            return
        }
        _gaq.push(c)
    };
    b.trackSocial = function (e, c, g, f) {
        var d = ["_trackSocial", e, c, g, f];
        if (location.host.indexOf("www") !== 0) {
            b.log(d);
            return
        }
        if (!window._gaq || !e || !c) {
            return
        }
        _gaq.push(d)
    };
    b.trackFacebook = function (d) {
        try {
            if (FB && FB.Event && FB.Event.subscribe) {
                FB.Event.subscribe("edge.create", function (e) {
                    b.trackSocial("facebook", "like", e, d)
                });
                FB.Event.subscribe("edge.remove", function (e) {
                    b.trackSocial("facebook", "unlike", e, d)
                });
                FB.Event.subscribe("message.send", function (e) {
                    b.trackSocial("facebook", "send", e, d)
                });
                FB.Event.subscribe("comment.create", function (e) {
                    b.trackSocial("facebook", "comment", e.href, d)
                });
                FB.Event.subscribe("comment.remove", function (e) {
                    b.trackSocial("facebook", "uncomment", e.href, d)
                })
            }
        } catch (c) {}
    };
    b.trackTwitter = function (d) {
        try {
            if (twttr && twttr.events && twttr.events.bind) {
                twttr.events.bind("tweet", function (e) {
                    if (e) {
                        var f;
                        if (e.target && e.target.nodeName == "IFRAME") {
                            f = b.extractParamFromTwitterUri(e.target.src, "url")
                        }
                        b.trackSocial("twitter", "tweet", f, d)
                    }
                })
            }
        } catch (c) {}
    };
    b.extractParamFromTwitterUri = function (h, e) {
        if (!h) {
            return
        }
        var j = h.split("#");
        if (j.length == 1) {
            return
        }
        var g = decodeURI(j[1]);
        e += "=";
        var f = g.split("&");
        for (var c = 0, d; d = f[c]; ++c) {
            if (d.indexOf(e) === 0) {
                return unescape(d.split("=")[1])
            }
        }
        return
    }
}(this.TBF = this.TBF || {}, jQuery));
$(function () {
    TBF.styleButtons();
    window.ajaxDialog = $("#ajax-content");
    $("#mainNavTabs li, .hover").live({
        mouseover: function () {
            $(this).addClass("ui-state-hover")
        },
        mouseout: function () {
            $(this).removeClass("ui-state-hover")
        }
    });
    $("#main-menu").ptMenu({
        menuItemClass: "potato-menu-item ui-state-default",
        hoverClass: "ui-state-hover"
    });
    $(".random-quote").textfill({
        maxFontSize: 40,
        step: 2
    });
    $(":checkbox[data-enabler-for]").live("click", function () {
        TBF.disable($(this))
    });
    $.ajaxSetup({
        cache: false,
        statusCode: {
            401: function () {
                location.href = "/login"
            },
            302: function () {
                location.href = "/login"
            }
        }
    });
    $.extend($.ui.dialog.prototype.options, {
        closeOnEscape: false,
        modal: true,
        bgiframe: true,
        resizable: false,
        show: {
            effect: "fade",
            speed: "fast"
        },
        hide: "fade",
        open: function () {
            $(this).parents(".ui-dialog-buttonpane button:eq(0)").focus()
        }
    });
    $('[data-ga-trackevent="click"]').live("click", function () {
        var a = $(this);
        TBF.trackEvent(a.data("ga-category"), a.data("ga-action"), a.data("ga-label"), a.data("ga-value"))
    });
    $('[data-ga-trackevent="change"]').live("change", function () {
        var a = $(this);
        TBF.trackEvent(a.data("ga-category"), a.data("ga-action"), a.data("ga-label"), a.data("ga-value"))
    })
});
(function (a) {
    a.validator.unobtrusive.parseDynamicContent = function (c) {
        a.validator.unobtrusive.parse(c);
        var b = a(c).first().closest("form");
        var d = b.data("unobtrusiveValidation");
        var e = b.validate();
        a.each(d.options.rules, function (g, h) {
            if (e.settings.rules[g] == undefined) {
                var f = {};
                a.extend(f, h);
                f.messages = d.options.messages[g];
                a("[name=" + g + "]").rules("add", f)
            } else {
                a.each(h, function (l, k) {
                    if (e.settings.rules[g][l] == undefined) {
                        var j = {};
                        j[l] = k;
                        j.messages = d.options.messages[g][l];
                        a("[name=" + g + "]").rules("add", j)
                    }
                })
            }
        })
    }
})($);

function clearValidationSummary() {
    var a = $("form").find('[data-valmsg-summary="true"]');
    var b = a.find("ul");
    if (b && b.length) {
        b.empty();
        a.addClass("validation-summary-valid").removeClass("validation-summary-errors")
    }
}
function getValidationSummary(b) {
    if (!b || !b.ValidationErrors) {
        return
    }
    var a = '<div class="validation-summary-errors" data-valmsg-summary="true"><ul>';
    $.each(b.ValidationErrors, function (c, d) {
        a += "<li>" + d.Error + "</li>"
    });
    a += "</ul></div>";
    return a
}(function (a, e, d) {
    var b = e.Dialog = {};
    a.extend(b, {
        dialog: null,
        hasValidationErrors: false,
        Opening: function (f) {
            f = a.extend(true, {
                id: "modal-dialog"
            }, f || {}, {
                css: {
                    display: "none"
                }
            });
            this.dialog = a("<div/>", f).appendTo(document.body);
            this._execOnCallback()
        },
        Updating: function () {
            this._execOnCallback()
        },
        Closing: function () {
            this._execOnCallback()
        },
        Open: function (f) {
            f = a.extend(true, {
                modal: true,
                width: "auto",
                resizable: false
            }, f || {}, {
                close: function () {
                    a(this).dialog("destroy").remove()
                },
                show: {
                    effect: "drop",
                    speed: "fast"
                },
                hide: "drop"
            });
            this.dialog.dialog(f);
            this._execOnCallback();
            a.validator.unobtrusive.parse(this.dialog)
        },
        Update: function (g) {
            this._parseResponse(arguments);
            if (!this.hasValidationErrors) {
                g = g || {};
                for (var f in g) {
                    this.dialog.dialog("option", f, g[f])
                }
            }
            this.dialog.dialog("option", "position", "center");
            this._execOnCallback();
            a.validator.unobtrusive.parse(this.dialog)
        },
        Close: function () {
            this._parseResponse(arguments);
            this._execOnCallback();
            if (!this.hasValidationErrors) {
                this.dialog.dialog("destroy").remove()
            } else {
                a.validator.unobtrusive.parse(this.dialog)
            }
        },
        CloseDialog: function () {
            this.dialog.dialog("destroy").remove()
        },
        _execOnCallback: function () {
            var f = arguments.callee.caller,
                g = (function (j) {
                    for (var h in j) {
                        if (j[h] === f) {
                            return j["On" + h]
                        }
                    }
                })(this);
            if (a.isFunction(g)) {
                g.apply(this, f.arguments)
            }
        },
        _parseResponse: function (f) {
            var j = f.callee.caller.caller.arguments[2],
                h = j.getAllResponseHeaders(),
                g = (/X\-Validation\-Errors\s*:\s*(true|false)/i.exec(h) || [, false])[1];
            this.hasValidationErrors = a.parseJSON(g)
        }
    });
    var c = e.Dialogs = {};
    c.Login = a.extend({}, b);
    c.ManageUsers = a.extend({}, b);
    c.ChargeHistory = a.extend({}, b)
}(jQuery, window));

function displayError(c, d, e) {
    var b = e || 300;
    var a = $('<div class="ui-widget">' + c + "</div>");
    a.dialog({
        modal: true,
        title: d,
        width: b,
        buttons: {
            Ok: function () {
                $(this).dialog("close")
            }
        }
    });
    return false
}
function verifySeal() {
    var a = "433";
    var b = "592";
    var c = "https://seal.godaddy.com:443/verifySeal?sealID=0hHfYZMJZMlOiQ6dCaClcdptTrbKnMQ92fM93LXQDbz5sTxP3W27MLCmqUW";
    window.open(c, "SealVerfication", "location=yes,status=yes,resizable=yes,scrollbars=no,width=" + b + ",height=" + a)
}
function SelectAll(a) {
    document.getElementById(a).focus();
    document.getElementById(a).select()
}
function callService(d, c, a, e) {
    var b = "application/x-www-form-urlencoded";
    if (typeof e !== "undefined" && e) {
        b = "application/json; charset=utf-8"
    }
    $.ajax({
        type: "POST",
        url: d,
        async: true,
        data: c,
        dataType: "json",
        contentType: b,
        success: function (f, g) {
            a(f)
        },
        error: function (h, g, f) {
            alert("There was an error connecting to the server.  Please refresh the page manually.")
        }
    })
}
function callServiceGet(d, c, a, e) {
    var b = "application/x-www-form-urlencoded";
    if (typeof e !== "undefined" && e) {
        b = "application/json; charset=utf-8"
    }
    $.ajax({
        type: "GET",
        url: d,
        async: true,
        data: c,
        dataType: "json",
        contentType: b,
        success: function (f, g) {
            a(f)
        },
        error: function (h, g, f) {
            alert("There was an error connecting to the server.  Please refresh the page manually.")
        }
    })
}
function showErrorAlert(d, e) {
    var b = e.errorList;
    var c = "";
    for (var a in b) {
        c += b[a].message + "\n"
    }
    alert(c);
    return false
}
function enableDisable(b, a) {
    if (b.is(":checked")) {
        $("input", a).removeAttr("disabled");
        a.fadeTo("fast", 1)
    } else {
        $("input", a).attr("disabled", "disabled");
        a.fadeTo("fast", 0.33)
    }
}
function disable(b, a) {
    if (!a) {
        $("input", b).removeAttr("disabled");
        b.fadeTo("fast", 1)
    } else {
        $("input", b).attr("disabled", "disabled");
        b.fadeTo("fast", 0.33)
    }
}
function showIndicator(a, c) {
    var b = c || "Loading...";
    a.mask(b)
}
function hideIndicator(a) {
    a.unmask()
}
function showWait(a, b) {
    if (b) {
        a.mask("Saving...")
    } else {
        a.unmask()
    }
}
String.prototype.format = function () {
    var b = this,
        a = arguments.length;
    while (a--) {
        b = b.replace(new RegExp("\\{" + a + "\\}", "gm"), arguments[a])
    }
    return b
};
String.prototype.bool = function () {
    return (/^true$/i).test(this)
};
String.prototype.startsWith = function (a) {
    return (this.match("^" + a) == a)
};
String.prototype.isImage = function () {
    return (/\.(jpg|gif|bmp|jpeg|png)$/i).test(this)
};
String.prototype.getExtension = function () {
    return /[^.]+$/.exec(this)
};
Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (this.indexOf(b) != -1) {
        this.splice(i, 1)
    }
};
if (!Array.prototype.filter) {
    Array.prototype.filter = function (a) {
        if (this === void 0 || this === null) {
            throw new TypeError()
        }
        var e = Object(this);
        var c = e.length >>> 0;
        if (typeof a !== "function") {
            throw new TypeError()
        }
        var d = [];
        var f = arguments[1];
        for (var b = 0; b < c; b++) {
            if (b in e) {
                var g = e[b];
                if (a.call(f, g, b, e)) {
                    d.push(g)
                }
            }
        }
        return d
    }
}
function CurrencyFormatted(c, a) {
    c = c.toString().replace(/\$|\,/g, "");
    if (isNaN(c)) {
        c = "0"
    }
    sign = (c == (c = Math.abs(c)));
    c = Math.floor(c * 100 + 0.50000000001);
    cents = c % 100;
    c = Math.floor(c / 100).toString();
    if (cents < 10) {
        cents = "0" + cents
    }
    for (var b = 0; b < Math.floor((c.length - (1 + b)) / 3); b++) {
        c = c.substring(0, c.length - (4 * b + 3)) + "," + c.substring(c.length - (4 * b + 3))
    }
    if (a && cents == "00") {
        return (((sign) ? "" : "-") + "$" + c)
    } else {
        return (((sign) ? "" : "-") + "$" + c + "." + cents)
    }
}(function (b, a) {
    b.Model = (function (c) {
        c.TbfInitTransfer = function (e) {
            var d = {
                TransferId: null,
                WebSiteId: -1,
                ExpirationDateTime: null,
                Title: null,
                SenderName: null,
                SenderEmail: null,
                Password: null,
                ConfirmPassword: null,
                DownloadNotification: false
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfInitFile = function (e) {
            var d = {
                FileId: null,
                TransferId: null,
                WebSiteId: -1,
                Size: 0,
                Name: null
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfInitRecipient = function (e) {
            var d = {
                Name: null,
                Email: null
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfInitUpload = function (e) {
            var d = {
                Message: null,
                PasswordProtect: false,
                ExpireFiles: true,
                Transfer: null,
                Files: [],
                Recipients: [],
                Contacts: [],
                ContactGroups: [],
                PersonalDropboxName: null,
                PrivateDropboxKey: null
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfFinalizeTransfer = function (e) {
            var d = {
                TransferId: null,
                StartDateTime: null,
                EndDateTime: null,
                Size: 0,
                FileCount: 0
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfFinalizeFile = function (e) {
            var d = {
                FileId: null,
                TransferId: null,
                StartDateTime: null,
                EndDateTime: null,
                Size: 0
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        c.TbfFinalizeUpload = function (e) {
            var d = {
                SendEmailAsMe: false,
                Transfer: null,
                Files: [],
                PersonalDropboxName: null,
                PrivateDropboxKey: null
            };
            var f = a.extend(true, {}, d);
            return a.extend(true, {}, f, e || {})
        };
        return c
    }(b.Model || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (a) {
    a.validator.addMethod("requiredif", function (e, b, d) {
        if (!d) {
            return false
        }
        var c = a(b).closest("form").find(':input[name="' + d.other + '"]').is(":checked");
        if (c ? !d.negate.bool() : d.negate.bool()) {
            return a.validator.methods.required.call(this, a.trim(b.value), b)
        }
        return true
    });
    a.validator.unobtrusive.adapters.add("requiredif", ["other", "negate"], function (b) {
        b.rules.requiredif = b.params;
        b.messages.requiredif = b.message
    })
}(jQuery));
TBF = window.TBF || {};
var _selectedTab = "#upload";
var _progressWidth = 650;
var _recipientsGrid;

function initTransferRecipientsTable(f) {
    var c = 0;
    var d = 1;
    var b = 2;
    var a = 3;
    var e = 4;
    _recipientsGrid = $("#recipientsTable").dataTable({
        bAutoWidth: false,
        sDom: 't<"push-top-1 clearfix"ip>',
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        bJQueryUI: true,
        sPaginationType: "full_numbers",
        iDisplayLength: 5,
        aaSorting: [
            [1, "desc"]
        ],
        aoColumns: [{
            bVisible: false
        }, {
            sTitle: "Sent To",
            fnRender: function (g) {
                switch (g.aData[4]) {
                case "0":
                    return '<div style="width:200px;overflow:hidden;"><a href="mailto:' + g.aData[1] + '">' + g.aData[1] + "</a></div>";
                case "1":
                    return '<div style="width:200px;overflow:hidden;">' + g.aData[1] + "</div>"
                }
                return ""
            }
        }, {
            sTitle: "Down",
            sWidth: "50px",
            sClass: "gridColumnCenter",
            fnRender: function (g) {
                switch (g.aData[2]) {
                case "0":
                    return "No";
                case "1":
                    return "Partial";
                case "2":
                    return "Yes"
                }
                return ""
            }
        }, {
            sTitle: "Actions",
            bSortable: false,
            sWidth: "60px",
            sClass: "gridColumnCenter"
        }, {
            bVisible: false
        }],
        fnRowCallback: function (l, j, k) {
            var g = $("td:eq(2)", l);
            var h = '<table align="center"><tr><td style="padding:2px;">';
            h += '<span id="actionResend" class="ui-icon ui-icon-mail-closed actionicon" title="Resend Transfer"></span>';
            h += '</td><td style="padding:2px;">';
            switch (j[e]) {
            case "0":
                h += '<span id="actionDisable" class="ui-icon ui-icon-trash actionicon" title="Disable Recipient"></span>';
                break;
            case "1":
                h += '<span id="actionEnable" class="ui-icon ui-icon-plus actionicon" title="Enable Recipient"></span>';
                break
            }
            h += "</td></tr></table>";
            g.html(h);
            $("#actionResend", g).data("tid", j[3]).data("rid", j[0]).click(function () {
                var n = $(this).data("tid");
                var m = $(this).data("rid");
                if (!n || !m) {
                    return
                }
                if (!confirm("Are you sure you want to resend this transfer?")) {
                    return
                }
                performRecipientHistoryAction(n, m, 0)
            });
            switch (j[e]) {
            case "0":
                $("#actionDisable", g).data("tid", j[3]).data("rid", j[0]).click(function () {
                    var n = $(this).data("tid");
                    var m = $(this).data("rid");
                    if (!n || !m) {
                        return
                    }
                    if (!confirm("Disabled recipients will not be allowed to download the transfer.  Are you sure you want to disable this recipient?")) {
                        return
                    }
                    performRecipientHistoryAction(n, m, 2)
                });
                break;
            case "1":
                $("#actionEnable", g).data("tid", j[3]).data("rid", j[0]).click(function () {
                    var n = $(this).data("tid");
                    var m = $(this).data("rid");
                    if (!n || !m) {
                        return
                    }
                    if (!confirm("Enabled recipients will be allowed to download the transfer.  Are you sure you want to enable this recipient?")) {
                        return
                    }
                    performRecipientHistoryAction(n, m, 1)
                });
                break
            }
            return l
        }
    });
    updateRecipientHistoryData(f)
}
function performRecipientHistoryAction(c, b, a) {
    callService("/download/recipienthistoryaction", {
        tid: c,
        rid: b,
        action: a
    }, function (d) {
        if (!d) {
            alert("There was an error performing the selcted action.");
            return
        }
        getRecipientHistoryData();
        alert("The recipient has been updated.")
    })
}
function getRecipientHistoryData() {
    callService("/download/recipienthistorydata/" + recipientTransferId, null, function (a) {
        if (!a || typeof a.list === "undefined") {
            return
        }
        updateRecipientHistoryData(a)
    })
}
function updateRecipientHistoryData(a) {
    _recipientsGrid.fnClearTable();
    _recipientsGrid.fnAddData(a.list)
}
function updateExpireDateDays() {
    var c = $("#expireDate").val();
    if (c != "" && $("#radioExpire").is(":checked")) {
        var b = new Date(c);
        var a = Math.ceil((b - (new Date())) / 86400000);
        $("#expireDateDays").text("(in " + a.toFixed(0) + " days)")
    } else {
        $("#expireDateDays").text("Never (until download limit reached)")
    }
}
function initTransferInfoSection() {
    var a = $("#expireDate");
    if (a.length == 1) {
        $("#expireDate").datepicker({
            minDate: 0,
            onSelect: function (c, h) {
                try {
                    var f = new Date(c);
                    var d = Math.ceil((f - (new Date())) / 86400000);
                    $("#expireDateDays").text("(in " + d.toFixed(0) + " days)")
                } catch (g) {}
            }
        });
        updateExpireDateDays()
    }
    $("#radioExpire").click(function () {
        if ($(this).is(":checked")) {
            $("#expireDate").prop("disabled", false)
        } else {
            $("#expireDate").prop("disabled", true)
        }
        updateExpireDateDays()
    });
    $("#PasswordProtected").click(function () {
        if ($(this).is(":checked")) {
            $("#Password").prop("disabled", false);
            $("#Confirm").prop("disabled", false)
        } else {
            $("#Password").prop("disabled", true).val("");
            $("#Confirm").prop("disabled", true).val("")
        }
    });
    var b = {
        dataType: "json",
        beforeSubmit: function () {
            showWait($("body"), true);
            return true
        },
        success: function (c) {
            showWait($("body"), false);
            if (c.Success) {
                alert("Your transfer has been updated.");
                if (typeof c.NeedRefresh !== "undefined" && c.NeedRefresh) {
                    location.reload(true)
                }
            } else {
                if (c.Message === undefined || c.Message == "") {
                    alert("An error occurred when attempting to update your transfer.")
                } else {
                    alert(c.Message)
                }
            }
        }
    };
    $("#updateTransferForm").ajaxForm(b);
    $("#passwordProtect").click(function () {
        $("#passwordProtectDiv").toggle()
    })
}
var _recentGrid;

function initRecentTransfers(a) {
    _recentGrid = $("#recentTable").dataTable({
        sDom: '<"shadow"<"H"lfr>t<"F"ip>>',
        bAutoWidth: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        bJQueryUI: true,
        bPaginate: false,
        aaSorting: [
            [1, "desc"]
        ],
        aoColumns: [{
            sTitle: "Name",
            sWidth: "230px",
            sClass: "gridColumnLeft",
            bSortable: false,
            fnRender: function (b) {
                return '<div style="width:230px;overflow:hidden;text-overflow: ellipsis;"><a href="/transfers/userdownload/' + b.aData[5] + '">' + b.aData[0] + "</a></div>"
            }
        }, {
            sTitle: "Date",
            bVisible: false
        }, {
            sTitle: "Files",
            sType: "numeric",
            sWidth: "30px",
            sClass: "gridColumnLeft",
            bSortable: false
        }, {
            sTitle: "Size",
            sType: "numeric",
            sWidth: "75px",
            sClass: "gridColumnLeft",
            bSortable: false,
            fnRender: function (b) {
                return TBF.formatSize(b.aData[3])
            }
        }, {
            sTitle: "Downloaded",
            sWidth: "70px",
            sClass: "gridColumnLeft",
            bSortable: false
        }, {
            bVisible: false
        }, {
            bVisible: false
        }, {
            sTitle: "Expires",
            sType: "date",
            sClass: "gridColumnLeft",
            bSortable: false,
            sWidth: "70px",
            bUseRendered: false,
            fnRender: function (c) {
                var b = c.aData[7];
                if (c.aData[6] == "0") {
                    if (b == "") {
                        return "Never"
                    } else {
                        return b
                    }
                }
                return "Expired"
            }
        }]
    });
    $("#recentTransfersControl div.fg-toolbar:eq(0)").html('<div style="text-align:center;">Recent Transfers</div>');
    if (!a || typeof a.list === "undefined") {
        return
    }
    _recentGrid.fnClearTable();
    _recentGrid.fnAddData(a.list);
    refreshTotals(a)
}
function refreshTotals(a) {
    $("#recentTransfersControl div.fg-toolbar:eq(1)").html("<span>Count: " + a.totalCount.toString() + " &nbsp;&nbsp;|&nbsp;&nbsp; Active: " + TBF.formatSize(a.activeStorage) + " &nbsp;&nbsp;|&nbsp;&nbsp; Rem: " + TBF.formatSize(a.remainingStorage) + "</span>");
    if (a.remainingStorage < a.maxStorage * 0.1) {
        var b = $("#historyStorageWarning");
        b.text(b.text().replace("{0}", TBF.formatSize(a.maxStorage)));
        b.show()
    }
}
function getData() {
    if (!recentTransfersData || typeof recentTransfersData.list === "undefined") {
        return
    }
    _recentGrid.fnClearTable();
    _recentGrid.fnAddData(recentTransfersData.list);
    refreshTotals(recentTransfersData)
}(function (b, a) {
    b.Auth = (function (c) {
        c.loginDialogReady = function () {
            a.validator.unobtrusive.parse("#loginForm");
            ajaxDialog.find(".button").button()
        };
        c.loginDialogInit = function () {
            ajaxDialog.dialog({
                width: 570,
                title: "",
                dialogClass: "ui-dialog-title-unstyled",
                close: function () {
                    a(this).dialog("destroy").html("")
                }
            });
            a("#openid-login li").click(function () {
                a("body").mask("Redirecting...")
            })
        };
        c.loginSuccess = function (d, e, f) {
            ajaxDialog.dialog("option", "title", ajaxDialog.find("legend").text());
            if (d.Success) {
                ajaxDialog.dialog("destroy");
                if (d.ReturnUrl) {
                    window.location.replace(d.ReturnUrl)
                } else {
                    window.location.replace("/")
                }
            }
        };
        c.loginFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        };
        c.requestPasswordResetInit = function () {
            ajaxDialog.dialog("destroy");
            ajaxDialog.dialog({
                width: 350,
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    "Reset Password": function () {
                        ajaxDialog.find("form").submit()
                    },
                    Close: function () {
                        a(this).dialog("destroy").html("")
                    }
                }
            })
        };
        c.requestPasswordResetSuccess = function (d, e, f) {
            ajaxDialog.dialog("option", {
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    Close: function () {
                        a(this).dialog("destroy").html("")
                    }
                }
            });
            ajaxDialog.html(f.responseText)
        };
        c.requestPasswordResetFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        };
        c.changePasswordInit = function () {
            ajaxDialog.dialog("destroy");
            ajaxDialog.css("overflow", "hidden").dialog({
                width: 400,
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    Change: function () {
                        ajaxDialog.find("form").submit()
                    },
                    Cancel: function () {
                        a(this).dialog("destroy").html("")
                    }
                }
            })
        };
        c.changePasswordSuccess = function (d, e, f) {
            ajaxDialog.dialog("option", "title", ajaxDialog.find("legend").text());
            alert("Your password has been changed.");
            window.location.reload(true)
        };
        c.changePasswordFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        };
        c.setInitialPasswordInit = function () {
            ajaxDialog.dialog("destroy");
            ajaxDialog.dialog({
                width: 400,
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    "Set Password": function () {
                        ajaxDialog.find("form").submit()
                    },
                    "I'll Set it Later": function () {
                        a.cookie("setuppass", null);
                        a(this).dialog("destroy").html("")
                    }
                },
                close: function () {
                    a.cookie("setuppass", null)
                }
            })
        };
        c.setInitialPasswordSuccess = function (d, e, f) {
            ajaxDialog.dialog("option", "title", ajaxDialog.find("legend").text());
            alert("Your password has been set.  Your new password can be used to log into the Desktop/Mobile applications.");
            a.cookie("setuppass", null);
            window.location.reload(true)
        };
        c.setInitialPasswordFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        };
        c.requestEmailChangeInit = function () {
            ajaxDialog.dialog("destroy");
            ajaxDialog.css("overflow", "hidden").dialog({
                width: 400,
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    "Change Email": function () {
                        ajaxDialog.find("form").submit()
                    },
                    Cancel: function () {
                        a(this).dialog("destroy").html("")
                    }
                }
            })
        };
        c.requestEmailChangeSuccess = function (d, e, f) {
            ajaxDialog.dialog("option", {
                title: ajaxDialog.find("legend").text(),
                buttons: {
                    Close: function () {
                        a(this).dialog("destroy").html("")
                    }
                }
            });
            ajaxDialog.html(f.responseText)
        };
        c.requestEmailChangeFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        };
        return c
    }(b.Auth || {}))
}(this.TBF = this.TBF || {}, jQuery));

function initAccountTabControl() {
    $("#accounttabcontrol").tabs({
        spinner: null,
        cache: false,
        cookie: {
            expires: 1
        },
        fx: {
            opacity: "toggle"
        },
        ajaxOptions: {
            error: function (d, c, b, a) {
                $(a.hash).html("Couldn't load this tab. We'll try to fix this as soon as possible.")
            },
            cache: false
        }
    }).addClass("ui-tabs-vertical ui-helper-clearfix").find("li").removeClass("ui-corner-top").addClass("ui-corner-left");
    $("#accounttabs").removeClass("ui-corner-all").addClass("ui-corner-left");
    if (selectedAccountTab) {
        $("#accounttabcontrol").tabs("select", selectedAccountTab)
    }
}
TBF = window.TBF || {};
TBF.Account = (function (c) {
    var b = false;
    var a = {
        contentElement: null,
        init: function () {},
        editBegin: function () {
            if (b) {
                return false
            }
            b = true;
            $("body").mask("Processing...")
        },
        editComplete: function () {
            $("body").unmask()
        },
        editSuccess: function (d) {
            if (!d || typeof d.Success === "undefined") {
                b = false;
                alert("The server returned an invalid response.");
                return
            }
            if (d.Success) {
                if (d.NeedRefresh) {
                    window.location.reload(true)
                } else {
                    b = false;
                    ajaxDialog.dialog("destroy").html("")
                }
            } else {
                b = false;
                alert(d.Message)
            }
        },
        editFailure: function (f, e, d) {
            b = false;
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.html(f.responseText);
                    return false
                }
            }
        }
    };
    c.editAccountDialog = a;
    c.editUserDialogInit = function () {
        ajaxDialog.css("overflow", "hidden").dialog({
            width: 350,
            title: "Edit User Info",
            buttons: {
                Save: function () {
                    $("#ajax-content form").submit()
                },
                Cancel: function () {
                    $(this).dialog("destroy").html("")
                }
            },
            close: function (d, e) {
                $(this).css("overflow", "auto")
            }
        })
    };
    c.editCreditCardDialogInit = function () {
        ajaxDialog.css("overflow", "hidden").dialog({
            width: 500,
            title: "Edit Billing Information",
            buttons: {
                Save: function () {
                    $("#ajax-content form").submit()
                },
                Cancel: function () {
                    $(this).dialog("destroy").html("")
                }
            },
            close: function (d, e) {
                $(this).css("overflow", "auto")
            }
        })
    };
    return c
}(TBF.Account || {}));

function initUserProfile() {
    var a = {
        dataType: "json",
        beforeSubmit: function () {
            accountControlWait(true);
            if ($("#FileExpirationDays").val() < 0) {
                alert("Default file expiration must be greater than or equal to zero.");
                accountControlWait(false);
                return false
            }
            return true
        },
        success: function (b) {
            accountControlWait(false);
            if (b.Success) {
                alert("Your user settings have been updated.");
                if (typeof b.NeedRefresh !== "undefined" && b.NeedRefresh) {
                    location.reload(true)
                }
            } else {
                if (b.Message == "undefined") {
                    alert("An error occurred when attempting to update your upload settings.")
                } else {
                    alert(b.Message)
                }
            }
        }
    };
    $("#userUploadSettingsForm").ajaxForm(a);
    enableDisable($("#RequirePassword"), $("#passwordProtectDiv"));
    $("#RequirePassword").click(function () {
        if ($(this).is(":checked")) {
            enableDisable($("#RequirePassword"), $("#passwordProtectDiv"))
        } else {
            enableDisable($("#RequirePassword"), $("#passwordProtectDiv"))
        }
    });
    TBF.styleButtons()
}
function initBillingInfo() {
    $("#cancelAccount").click(function () {
        $("#accountCancel").dialog("open")
    });
    var a = $("#accountCancel").dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        modal: true,
        position: "center",
        dialogClass: "popupDialog",
        width: 550
    });
    $("#dontCancelButton").click(function () {
        a.dialog("close");
        return false
    });
    var b = {
        dataType: "json",
        beforeSubmit: function () {
            var d = $("#accountInfoForm").valid();
            if (d) {
                accountControlWait(true)
            }
            return d
        },
        success: function (d) {
            accountControlWait(false);
            showAccountEdit(".accountinfodisplay", ".accountinfoedit");
            if (d.Success) {
                $("#displayAccountCompanyName").html(d.Account.CompanyName)
            }
            if (d.Message != undefined) {
                alert(d.Message)
            }
        }
    };
    $("#accountInfoForm").ajaxForm(b);
    var c = {
        dataType: "json",
        beforeSubmit: function () {
            var d = confirm("Upon canceling your account, all transfers/files will be immediately removed from our servers.  Are you sure you want to cancel your account?");
            if (d) {
                accountControlWait(true)
            }
            return d
        },
        success: function (d) {
            accountControlWait(false);
            if (d.success) {
                alert("Your account has been cancelled.  Thank you for using TransferBigFiles.com");
                window.top.location = "/home/feedback"
            } else {
                if (d.errormessage == "undefined") {
                    alert("An error occurred when attempting to cancel your account.")
                } else {
                    alert(d.errormessage)
                }
            }
        }
    };
    $("#cancellationForm").ajaxForm(c);
    TBF.styleButtons()
}
function showWait(a, b) {
    if (b) {
        a.mask("Saving...")
    } else {
        a.unmask()
    }
}
function accountControlWait(a) {
    showWait($("body"), a)
}
function showAccountEdit(b, a) {
    $(a).hide();
    $(b).show()
}(function (b, a) {
    b.UploadWidgets = (function (c) {
        c.settingsInit = function () {
            b.watermark(ajaxDialog);
            ajaxDialog.dialog({
                width: 980,
                title: ajaxDialog.find("legend").first().text(),
                buttons: {
                    "Save & Preview": function () {
                        ajaxDialog.find("form").submit()
                    },
                    Close: function () {
                        a(this).dialog("destroy").html("");
                        location.reload(true)
                    }
                }
            })
        };
        c.settingsReady = function () {
            var n = ajaxDialog,
                p = n.find("#UploadWidgetId"),
                q = n.find("#WidgetName"),
                f = n.find("#edit-widget-name"),
                m = n.find("#save-widget-name"),
                e = n.find("#delete-widget"),
                d = n.find("#create-widget"),
                o = n.find("#uploadWidgetSettingsForm"),
                l = n.find("#preview-hosted-widget"),
                k = n.find("#PasswordProtect"),
                g = n.find("#HostedUrl"),
                h = n.find("#hosted-url-link"),
                j = n.find(".hosting-option");
            b.disable("#uploadWidgetSettingsForm");
            n.find(".button").button();
            l.button({
                icons: {
                    primary: "ui-icon-link"
                }
            });
            p.change(function () {
                ajaxDialog.find("#upload-widget-settings-panel").load("/uploadwidgets/settingsform/" + a(this).val());
                ajaxDialog.find("#upload-widget-preview-panel").load("/uploadwidgets/settingspreview/" + a(this).val())
            });
            f.click(function () {
                n.find(".upload-widget-edit").toggle();
                return false
            });
            m.click(function () {
                p.find(":selected").html(q.val());
                n.find("form").submit();
                return false
            });
            d.click(function () {
                a.post("/uploadwidgets/createwidget/" + p.val(), function (r) {
                    if (r) {
                        n.load("/uploadwidgets/settings/" + r)
                    } else {
                        alert("Upload widget could not be created.")
                    }
                });
                return false
            });
            e.click(function () {
                if (confirm("Are you sure you want to delete this upload widget?")) {
                    a.post("/uploadwidgets/deletewidget/" + p.val(), function (r) {
                        if (r) {
                            alert("Upload widget successfully deleted.");
                            n.load("/uploadwidgets/settings")
                        } else {
                            alert("Upload widget could not be deleted.")
                        }
                    })
                }
                return false
            });
            k.change(function () {
                if (!a(this).is(":checked")) {
                    n.find("#Password, #Confirm").val("")
                }
                ajaxDialog.find("#password-protect-section").slideToggle("fast")
            });
            j.change(function () {
                a(this).parent().next().slideToggle("fast")
            });
            g.keyup(function () {
                h.attr("href", hostedUploadWidgetUrlPrefix + a(this).val())
            });
            o.find(".ui-state-disabled-light").find("input, textarea, select, button").attr("disabled", "disabled").end().end().find(":checkbox").click(function () {
                o.submit()
            }).end().find("#WidgetTheme, :input").change(function () {
                o.submit()
            });
            a("#custom-width-slider").slider({
                range: "min",
                value: parseInt(a("#WidgetWidth").val(), 10),
                min: 250,
                max: 500,
                slide: function (r, s) {
                    a("#WidgetWidth").val(s.value);
                    a("#widget-width-display").html(s.value)
                },
                stop: function (r, s) {
                    o.submit()
                }
            });
            a.validator.unobtrusive.parse("#uploadWidgetSettingsForm")
        };
        c.previewReady = function () {
            var f = ajaxDialog,
                g = f.find("#uploadWidgetSettingsForm"),
                e = f.find("#uploadWidgetPreview"),
                d = e.find("iframe");
            e.find("iframe").load(function () {
                var j = a(this.contentWindow.document.getElementById("slickUpload")),
                    h = j.height(),
                    k = j.width();
                h = (h || 250);
                k = (k || 300);
                d.height(h + 10).width(k + 4);
                d.parent().width(k + 4);
                e.find(".widget-dimensions").find(".width").html(k).end().find(".height").html(d.parent().height());
                e.css("visibility", "visible");
                f.find("#embeddedIframeTextDisplay").val(a.trim(e.find(".upload-widget-iframe-wrapper").html()))
            })
        };
        c.setIframeText = function () {
            ajaxDialog.find("#embeddedIframeTextDisplay").val(a.trim(a("#uploadWidgetPreview").html()))
        };
        c.settingsSuccess = function (d, e, f) {
            ajaxDialog.find("#upload-widget-preview-panel").load("/uploadwidgets/settingspreview/" + a("#UploadWidgetId").val())
        };
        c.settingsFailure = function (f, e, d) {
            if (f.readyState == 0 || f.status == 0) {
                return true
            } else {
                if (f.status == 400) {
                    ajaxDialog.find("#upload-widget-settings-panel").html(f.responseText);
                    return false
                }
            }
        };
        return c
    }(b.UploadWidgets || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.ChargeHistory = (function (n) {
        var c = null,
            h = 0,
            e = 1,
            d = 2,
            l = 3,
            j = 4,
            g = 5,
            k = 6,
            f = 7;
        var m = function () {
                callService("/charges/historydata", null, function (o) {
                    if (!o || typeof o.list === "undefined") {
                        return
                    }
                    c.fnClearTable();
                    c.fnAddData(o.list)
                })
            };
        n.init = function (o) {
            c = a("#chargesTable").dataTable({
                sDom: 't<"push-top-1 clearfix"ip>',
                bAutoWidth: false,
                bLengthChange: false,
                bFilter: false,
                bSort: false,
                bInfo: false,
                bJQueryUI: true,
                sPaginationType: "full_numbers",
                iDisplayLength: 12,
                aoColumns: [{
                    bVisible: false
                }, {
                    sTitle: "Charge Date",
                    sType: "date",
                    sClass: "gridColumnRight",
                    sWidth: "100px",
                    fnRender: function (p) {
                        return '<a href="/charges/details/' + p.aData[0] + '">' + p.aData[1] + "</a>"
                    }
                }, {
                    sTitle: "Type",
                    sWidth: "60px",
                    sClass: "gridColumnCenter",
                    fnRender: function (p) {
                        switch (p.aData[2]) {
                        case "0":
                            return "Recurring";
                        case "1":
                            return "One Time"
                        }
                        return ""
                    }
                }, {
                    sTitle: "Source",
                    sWidth: "75px",
                    sType: "numeric",
                    sClass: "gridColumnCenter",
                    fnRender: function (p) {
                        switch (p.aData[3]) {
                        case "0":
                            return "Credit Card";
                        case "1":
                            return "App Store";
                        case "2":
                            return "PayPal"
                        }
                        return ""
                    }
                }, {
                    sTitle: "Subtotal",
                    sType: "numeric",
                    sWidth: "65px",
                    sClass: "gridColumnRight",
                    bUseRendered: false,
                    fnRender: function (p) {
                        if (p.aData[l] == "2") {
                            return "(" + p.aData[j] + ")"
                        } else {
                            return p.aData[j]
                        }
                    }
                }, {
                    sTitle: "Discount",
                    sType: "numeric",
                    sWidth: "65px",
                    sClass: "gridColumnRight",
                    bUseRendered: false
                }, {
                    sTitle: "Total",
                    sType: "numeric",
                    sWidth: "60px",
                    sClass: "gridColumnRight",
                    bUseRendered: false,
                    fnRender: function (p) {
                        if (p.aData[l] == "2") {
                            return "(" + p.aData[k] + ")"
                        } else {
                            return p.aData[k]
                        }
                    }
                }, {
                    sTitle: "Description",
                    sClass: "gridColumnLeft",
                    bUseRendered: false
                }]
            });
            m()
        };
        return n
    }(b.ChargeHistory || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.Contacts = (function (j) {
        var e = null,
            g = null,
            f = null,
            h = null;
        var d = function () {
                if (h != -1) {
                    e.jqGrid("restoreRow", h);
                    h = -1
                }
                var m = a(this).val().toLowerCase();
                var l = false;
                for (row = 0; row < f.length; row++) {
                    l = false;
                    a.each(f[row], function (n, o) {
                        if (o.toLowerCase().indexOf(m) != -1) {
                            l = true;
                            return
                        }
                    });
                    rowId = f[row]["id"];
                    if (l) {
                        e.find("#" + rowId).show()
                    } else {
                        e.find("#" + rowId).hide()
                    }
                }
            };
        var k = function (n, m, l) {
                e.jqGrid("setGridParam", "datatype", "json");
                e.trigger("reloadGrid")
            };
        var c = function (l) {
                if (l && l !== h) {
                    a(this).jqGrid("restoreRow", h);
                    h = l
                }
                a(this).jqGrid("editRow", l, true, null, null, null, null, null, b.JqGrid.errorFunc, b.JqGrid.restoreRowFocus)
            };
        j.initManageGrid = function () {
            b.JqGrid.initGridDefaults({
                objectType: "Contact"
            });
            e = a("#grid-items");
            e.jqGrid({
                url: "/contacts/managedata",
                sortname: "firstname",
                loadonce: true,
                sortorder: "asc",
                sortable: true,
                datatype: "json",
                mtype: "GET",
                pginput: true,
                pgbuttons: true,
                viewrecords: true,
                caption: '<input type="search" id="grid-filter" title="Search..." results="0" />',
                pager: "#grid-pager",
                height: "100%",
                colNames: ["Contact Id", "First Name", "Last Name", "Email"],
                colModel: [{
                    name: "id",
                    index: "id",
                    hidden: true
                }, {
                    name: "firstname",
                    index: "firstname",
                    width: 200,
                    editable: true
                }, {
                    name: "lastname",
                    index: "lastname",
                    width: 200,
                    editable: true
                }, {
                    name: "Email",
                    index: "Email",
                    width: 250,
                    editable: true,
                    editrules: {
                        required: true,
                        email: true
                    }
                }],
                loadComplete: function () {
                    g = a("#grid-filter");
                    g.keyup(d);
                    g.watermark(g.attr("title"), "watermark");
                    g.click(function () {
                        if (g.val().length == 0) {
                            d.call(this)
                        }
                    })
                },
                onSelectRow: function (l, m) {
                    if (h != -1) {
                        a(this).jqGrid("saveRow", h);
                        h = -1
                    }
                },
                ondblClickRow: c,
                gridComplete: function () {
                    f = a(this).jqGrid("getRowData")
                },
                editurl: "/contacts/update",
                width: 780,
                emptyrecords: "You don't have any contacts."
            }).navGrid("#grid-pager", {
                view: false,
                search: false
            }, {
                afterComplete: k
            }, {
                url: "/contacts/add",
                afterComplete: k
            }, {
                url: "/contacts/delete",
                afterComplete: k
            }, {}, {});
            e.jqGrid("bindKeys", {
                onSpace: c
            });
            a(".add-contact").button().click(function () {
                e.jqGrid("editGridRow", "new", {
                    url: "/contacts/add",
                    afterComplete: k
                })
            })
        };
        return j
    }(b.Contacts || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.Dropbox = (function (s) {
        var c = null,
            m = 0,
            p = 1,
            l = 2,
            g = 3,
            k = 4,
            n = 5,
            h = 6,
            o = 7,
            j = 8,
            d = 9,
            f = 10,
            e = 11;
        var q = function (z) {
                var y = c.fnSettings().aoColumns[z].bVisible;
                c.fnSetColumnVis(z, y ? false : true)
            };
        var w = function (y) {
                a("#dropboxTotals").html("<span>Total Received Transfers: " + y.totalCount.toString() + " &nbsp;&nbsp;|&nbsp;&nbsp; Active Received Storage: " + b.formatSize(y.activeStorage) + " &nbsp;&nbsp;|&nbsp;&nbsp; Remaining Storage: " + b.formatSize(y.remainingStorage) + "</span>");
                var z = a("#dropboxStorageWarning");
                if (y.remainingStorage < y.maxStorage * 0.1) {
                    z.text(z.text().replace("{0}", b.formatSize(y.maxStorage)));
                    z.show()
                } else {
                    z.text("");
                    z.hide()
                }
            };
        var r = function () {
                var z = a("#showAllHistoryCheck").is(":checked");
                var y;
                if (a("#inboxfor").length == 1) {
                    y = a("#inboxfor").val()
                }
                callService("/transfers/dropboxhistorydata", {
                    inboxfor: y,
                    showAll: z
                }, function (A) {
                    if (!A || typeof A.list === "undefined") {
                        return
                    }
                    c.fadeOut();
                    x(A);
                    c.fadeIn()
                })
            };
        var x = function (y) {
                c.fnClearTable();
                c.fnAddData(y.list);
                w(y)
            };
        var v = function (z, y) {
                callService(z, y, function (A) {
                    if (!A) {
                        alert("There was an error performing the selcted action.");
                        return
                    }
                    r()
                })
            };
        var t = function (z, y) {
                v("/transfers/dropboxhistoryaction", {
                    id: z,
                    action: y
                })
            };
        var u = function (y) {
                v("/transfers/dropboxhistoryactionall", {
                    action: y
                })
            };
        s.init = function (y) {
            a("#showAllHistoryCheck").button().click(function () {
                b.trackEvent("history actions", "show all click", "received tab toolbar");
                r()
            });
            a("#expireAllSpan").click(function () {
                b.trackEvent("history actions", "expire all click", "received tab toolbar");
                if (confirm("Are you sure you want to expire all the transfers in your dropbox?")) {
                    u(1)
                }
            });
            a("#removeAllSpan").click(function () {
                b.trackEvent("history actions", "hide expired click", "received tab toolbar");
                if (confirm("Are you sure you want to remove all the transfers in your dropbox?")) {
                    u(0)
                }
            });
            c = a("#dropboxTable").dataTable({
                sDom: '<"shadow no-bottom"<"H"lfr>t<"F"ip>>',
                bLengthChange: true,
                bFilter: true,
                bJQueryUI: true,
                bAutoWidth: true,
                bStateSave: true,
                sCookiePrefix: "",
                sPaginationType: "full_numbers",
                iDisplayLength: 25,
                aaSorting: [
                    [1, "desc"]
                ],
                aoColumns: [{
                    sTitle: "Name",
                    fnRender: function (z) {
                        return '<div><a href="/transfers/userdownload/' + z.aData[d] + '"><div style="width:200px;overflow:hidden;text-overflow:ellipsis;">' + z.aData[m] + "</div></a></div>"
                    }
                }, {
                    sTitle: "To",
                    sWidth: "80px"
                }, {
                    sTitle: "From",
                    sWidth: "85px"
                }, {
                    sTitle: "Date",
                    sType: "date",
                    sClass: "gridColumnRight",
                    sWidth: "70px",
                    iDataSort: f
                }, {
                    sTitle: "Files",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "45px"
                }, {
                    sTitle: "Size",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "105px",
                    bUseRendered: false,
                    fnRender: function (z) {
                        return b.formatSize(z.aData[n])
                    }
                }, {
                    sTitle: "Down",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "45px",
                    fnRender: function (z) {
                        if (z.aData[e].bool() == true) {
                            return z.aData[h]
                        }
                        return ""
                    }
                }, {
                    sTitle: "Status",
                    sWidth: "60px",
                    bUseRendered: false,
                    fnRender: function (z) {
                        switch (z.aData[o]) {
                        case "0":
                            return "Active";
                        case "1":
                            return "Suspended";
                        case "2":
                            return "Expired";
                        default:
                            return "Unknown"
                        }
                    }
                }, {
                    sTitle: "Expires",
                    sType: "date",
                    sClass: "gridColumnRight",
                    sWidth: "70px",
                    bUseRendered: false,
                    fnRender: function (A) {
                        var z = A.aData[j];
                        if (A.aData[o] == "0") {
                            if (z == "") {
                                return "Never"
                            } else {
                                return z
                            }
                        }
                        return ""
                    }
                }, {
                    sTitle: "Actions",
                    bSortable: false,
                    sWidth: "50px"
                }, {
                    bVisible: false
                }],
                fnRowCallback: function (C, A, B) {
                    var z = a("td:eq(9)", C);
                    if (A[e].bool() == true) {
                        switch (A[o]) {
                        case "0":
                            z.html('<span id="actionExpire" class="linkspan">Expire</span>');
                            a("#actionExpire", z).data("tid", A[d]).click(function () {
                                b.trackEvent("history actions", "expire transfer click", "received tab table");
                                var D = a(this).data("tid");
                                if (!D) {
                                    return
                                }
                                if (!confirm("All files in this transfer will be deleted. Are you sure you want to expire this transfer?")) {
                                    return
                                }
                                t(D, 1)
                            });
                            break;
                        case "1":
                        case "2":
                            z.html('<span id="actionRemove" class="linkspan">Remove</span>');
                            a("#actionRemove", z).data("tid", A[d]).click(function () {
                                b.trackEvent("history actions", "hide transfer click", "received tab table");
                                var D = a(this).data("tid");
                                if (!D) {
                                    return
                                }
                                if (!confirm("This removes the transfer from your list. Are you sure you want to remove this transfer?")) {
                                    return
                                }
                                t(D, 0)
                            });
                            break;
                        default:
                            z.html("");
                            break
                        }
                    } else {
                        z.html("")
                    }
                    return C
                }
            });
            a("div.toolbar").html('<div style="float:right;"><span id="expireAllSpan" class="linkspannormal">Expire All</span>&nbsp;&nbsp;<span id="removeAllSpan" class="linkspannormal">Remove All</span></div>');
            a("#inboxfor").change(function () {
                b.trackEvent("history actions", "inbox select changed", "received tab toolbar");
                r()
            });
            x(y)
        };
        return s
    }(b.Dropbox || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.History = (function (s) {
        var c = null,
            m = 0,
            q = 1,
            f = 2,
            k = 3,
            o = 4,
            h = 5,
            p = 6,
            g = 7,
            j = 8,
            d = 9,
            e = 10,
            l = 11,
            n = 12;
        var w = function (y) {
                a("#historyTotals").html("<span>Total Transfers: " + y.totalCount.toString() + " &nbsp;&nbsp;|&nbsp;&nbsp; Active File Storage: " + b.formatSize(y.activeStorage) + " &nbsp;&nbsp;|&nbsp;&nbsp; Remaining Storage: " + b.formatSize(y.remainingStorage) + "</span>");
                var z = a("#historyStorageWarning");
                if (y.remainingStorage < y.maxStorage * 0.1) {
                    z.text(z.text().replace("{0}", b.formatSize(y.maxStorage)));
                    z.show()
                } else {
                    z.text("");
                    z.hide()
                }
            };
        var r = function () {
                var y = a("#showAllHistoryCheck").is(":checked");
                var z;
                if (a("#viewuserhistorycombo").length == 1) {
                    z = a("#viewuserhistorycombo").val()
                }
                callService("/transfers/historydata", {
                    userId: z,
                    showAll: y
                }, function (A) {
                    if (!A || typeof A.list === "undefined") {
                        return
                    }
                    c.fadeOut();
                    x(A);
                    c.fadeIn()
                })
            };
        var x = function (y) {
                c.fnClearTable();
                c.fnAddData(y.list);
                w(y)
            };
        var v = function (z, y) {
                callService(z, y, function (A) {
                    if (!A) {
                        alert("There was an error performing the selcted action.");
                        return
                    }
                    r()
                })
            };
        var t = function (z, y) {
                v("/transfers/historyaction", {
                    id: z,
                    action: y
                })
            };
        var u = function (y) {
                v("/transfers/historyactionall", {
                    action: y
                })
            };
        s.init = function (y) {
            c = a("#historyTable").dataTable({
                sDom: '<"shadow no-bottom"<"H"lfr>t<"F"ip>>',
                bLengthChange: true,
                bFilter: true,
                bInfo: true,
                bStateSave: true,
                sCookiePrefix: "",
                bJQueryUI: true,
                bAutoWidth: false,
                sPaginationType: "full_numbers",
                iDisplayLength: 25,
                aaSorting: [
                    [2, "desc"]
                ],
                aoColumns: [{
                    sTitle: "Name",
                    fnRender: function (z) {
                        return '<div><a href="/transfers/userdownload/' + z.aData[d] + '"><div style="width:200px;overflow:hidden;text-overflow:ellipsis;">' + z.aData[m] + "</div></a></div>"
                    }
                }, {
                    sTitle: "User"
                }, {
                    sTitle: "Date",
                    sType: "date",
                    sClass: "gridColumnRight",
                    sWidth: "70px",
                    iDataSort: "10"
                }, {
                    sTitle: "Files",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "50px"
                }, {
                    sTitle: "Size",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "75px",
                    bUseRendered: false,
                    fnRender: function (z) {
                        return b.formatSize(z.aData[o])
                    }
                }, {
                    sTitle: "Down",
                    sType: "numeric",
                    sClass: "gridColumnRight",
                    sWidth: "60px"
                }, {
                    sTitle: "Status",
                    sWidth: "75px",
                    bUseRendered: false,
                    fnRender: function (z) {
                        switch (z.aData[p]) {
                        case "0":
                            return "Active";
                        case "1":
                            return "Suspended";
                        case "2":
                            return "Expired";
                        case "3":
                            return "Incomplete";
                        default:
                            return "Unknown"
                        }
                    }
                }, {
                    sTitle: "Type",
                    sWidth: "75px",
                    bUseRendered: false,
                    fnRender: function (z) {
                        switch (z.aData[g]) {
                        case "0":
                            return "Web";
                        case "1":
                            return "Mobile";
                        case "2":
                            return "Windows";
                        case "3":
                            return "Mac";
                        default:
                            return "Unknown"
                        }
                    }
                }, {
                    sTitle: "Expires",
                    sType: "date",
                    sClass: "gridColumnRight",
                    sWidth: "70px",
                    bUseRendered: false,
                    fnRender: function (A) {
                        var z = A.aData[j];
                        if (A.aData[p] == "0") {
                            if (z == "") {
                                return "Never"
                            } else {
                                return z
                            }
                        }
                        return ""
                    }
                }, {
                    sTitle: "Actions",
                    bSortable: false,
                    sWidth: "50px"
                }, {
                    bVisible: false
                }],
                fnRowCallback: function (C, A, B) {
                    var z = a("td:eq(9)", C);
                    switch (A[p]) {
                    case "0":
                        z.html('<span id="actionExpire" class="linkspan">Expire</span>');
                        a("#actionExpire", z).data("tid", A[d]).click(function () {
                            b.trackEvent("history actions", "expire transfer click", "sent tab table");
                            var D = a(this).data("tid");
                            if (!D) {
                                return
                            }
                            if (!confirm("All files in this transfer will be deleted. Are you sure you want to expire this transfer?")) {
                                return
                            }
                            t(D, 1)
                        });
                        break;
                    case "1":
                    case "2":
                        z.html('<span id="actionRemove" class="linkspan">Remove</span>');
                        a("#actionRemove", z).data("tid", A[d]).click(function () {
                            b.trackEvent("history actions", "hide transfer click", "sent tab table");
                            var D = a(this).data("tid");
                            if (!D) {
                                return
                            }
                            if (!confirm("This removes the transfer from your list. Are you sure you want to remove this transfer?")) {
                                return
                            }
                            t(D, 0)
                        });
                        break;
                    default:
                        z.html("");
                        break
                    }
                    return C
                }
            });
            a("#showAllHistoryCheck").button().click(function () {
                b.trackEvent("history actions", "show all click", "sent tab toolbar");
                r()
            });
            a("#viewuserhistorycombo").change(function () {
                b.trackEvent("history actions", "user select changed", "sent tab toolbar");
                r()
            });
            a("#expireAllSpan").click(function () {
                b.trackEvent("history actions", "expire all click", "sent tab toolbar");
                if (confirm("Are you sure you want to expire all your transfers?")) {
                    u(1)
                }
            });
            a("#removeAllSpan").click(function () {
                b.trackEvent("history actions", "hide expired click", "sent tab toolbar");
                if (confirm("Are you sure you want to remove all your transfers?")) {
                    u(0)
                }
            });
            x(y)
        };
        return s
    }(b.History || {}))
}(this.TBF = this.TBF || {}, jQuery));
TBF = window.TBF || {};
TBF.JqGrid = (function (a) {
    var d = function (e) {
            $.jgrid.nav.addtext = "Add";
            $.jgrid.nav.edittext = "Edit";
            $.jgrid.nav.deltext = "Delete";
            $.jgrid.nav.viewtext = "View";
            $.jgrid.nav.alerttext = $.jgrid.format("Please, Select {0}", e);
            $.jgrid.nav.addtitle = $.jgrid.format("Add New {0}", e);
            $.jgrid.nav.edittitle = $.jgrid.format("Edit Selected {0}", e);
            $.jgrid.nav.deltitle = $.jgrid.format("Delete Selected {0}", e);
            $.jgrid.nav.viewtitle = $.jgrid.format("View Selected {0}", e);
            $.jgrid.edit.addCaption = $.jgrid.format("Add {0}", e);
            $.jgrid.edit.editCaption = $.jgrid.format("Edit {0}", e);
            $.jgrid.del.caption = $.jgrid.format("Delete {0}", e);
            $.jgrid.del.msg = $.jgrid.format("Delete Selected {0}?", e);
            $.jgrid.view.caption = $.jgrid.format("View {0}", e)
        };
    var c = function () {
            $.extend($.jgrid.edit, {
                closeAfterEdit: true,
                closeAfterAdd: true,
                closeOnEscape: true,
                savekey: [true, 13],
                viewPagerButtons: false,
                errorTextFormat: a.errorTextFormat,
                afterSubmit: a.afterSubmit
            });
            $.extend($.jgrid.del, {
                closeOnEscape: true,
                savekey: [true, 13],
                errorTextFormat: a.errorTextFormat,
                afterSubmit: a.afterSubmit
            })
        };
    var b = function (f) {
            if (!f || !f.ValidationErrors) {
                return
            }
            var e = '<div class="ui-state-error"><ul style="list-style-type: none; text-align: left;">';
            $.each(f.ValidationErrors, function (g, h) {
                e += "<li>" + h.Error + "</li>"
            });
            e += "</ul></div>";
            return e
        };
    a.initGridDefaults = function (f) {
        var e = {
            objectType: "Record"
        };
        var g = $.extend(true, {}, e, f);
        d(g.objectType);
        c()
    };
    a.errorTextFormat = function (e) {
        if (e.readyState == 0 || e.status == 0) {
            return
        } else {
            if (e.status == 400) {
                return b($.parseJSON(e.responseText))
            } else {
                return "Oops, an error occurred."
            }
        }
    };
    a.afterSubmit = function (k, g) {
        var j = true;
        var e = "";
        var h = $.parseJSON(k.responseText);
        if (k.status != 200) {
            j = false;
            e = this.errorTextFormat(k)
        }
        var f;
        if (h.NewId) {
            f = h.NewId
        }
        return [j, e, f]
    };
    a.errorFunc = function (g, j, h) {
        if (j.readyState == 0 || j.status == 0) {
            return
        } else {
            if (j.status == 400) {
                try {
                    $.jgrid.info_dialog($.jgrid.errors.errcap, b($.parseJSON(j.responseText)), $.jgrid.edit.bClose, {
                        buttonalign: "right"
                    })
                } catch (f) {
                    alert("Sorry, an error occurred.")
                }
            } else {
                alert("Sorry, an error occurred.")
            }
        }
    };
    a.restoreRowFocus = function (e) {
        if ($(this).jqGrid("getGridParam", "selrow") == e) {
            $("#" + e).focus()
        }
    };
    return a
}(TBF.JqGrid || {}));
(function (b, a) {
    b.Sharing = (function (m) {
        var n = "",
            e, f = false,
            g = false,
            h = (function () {
                var t = [],
                    p, s = navigator,
                    u = "Shockwave Flash",
                    r = "application/x-shockwave-flash";
                if (typeof s.plugins !== "undefined" && typeof s.plugins[u] === "object") {
                    p = s.plugins[u].description;
                    if (p && !(typeof s.mimeTypes !== "undefined" && s.mimeTypes[r] && !s.mimeTypes[r].enabledPlugin)) {
                        p = p.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        t[0] = parseInt(p.replace(/^(.*)\..*$/, "$1"), 10);
                        t[1] = parseInt(p.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        t[2] = /[a-zA-Z]/.test(p) ? parseInt(p.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    }
                } else {
                    if (typeof window.ActiveXObject !== "undefined") {
                        try {
                            var o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            if (o) {
                                p = o.GetVariable("$version");
                                if (p) {
                                    p = p.split(" ")[1].split(",");
                                    t = [parseInt(p[0], 10), parseInt(p[1], 10), parseInt(p[2], 10)]
                                }
                            }
                        } catch (q) {}
                    }
                }
                return t[0]
            })(),
            d = null,
            c = null,
            j = function (p) {
                var o = 0,
                    q = 0;
                if (p.offsetParent) {
                    do {
                        o += p.offsetLeft;
                        q += p.offsetTop
                    } while (p = p.offsetParent)
                }
                return {
                    x: o,
                    y: q
                }
            },
            l = function (q) {
                var p = document.getElementById(q);
                if (!p) {
                    return false
                }
                var o = a(p).addClass("dark-dialog").addClass("triangle-isosceles").addClass("triangle-top");
                var r = document.getElementById("dark-dialog-overlay");
                if (!r) {
                    r = document.createElement("div");
                    r.id = "dark-dialog-overlay";
                    r.style.display = "none";
                    document.body.appendChild(r)
                }
                return p
            },
            k = function () {
                if (e) {
                    e.hide()
                }
                g = true;
                if (c) {
                    c.hide()
                }
                a(document).off("keydown", escHandler);
                a("#dark-dialog-overlay").hide().off("click", outerClickHandler);
                a(window).off("resize", resizeHandler);
                c = null
            };
        outerClickHandler = function (o) {
            k();
            o.stopPropagation()
        }, escHandler = function (o) {
            if (o.keyCode === 27 && !a(o.srcElement).hasClass("ui-autocomplete-input")) {
                k();
                o.stopPropagation()
            }
        }, resizeHandler = function () {
            var p, o = a("#share-dialog");
            if (d) {
                p = j(d), o.css("top", p.y + a(d).height() + 5).css("left", p.x - (o.width() / 2) + (a(d).width() / 2) - 15)
            }
        };
        m.init = function () {
            if (h >= 9) {
                e = new ZeroClipboard.Client()
            } else {
                a("#copy-button").hide()
            }
            if (suggestions !== "undefined") {
                var o = a("#newRecipients");
                o.autocomplete({
                    source: function (p, q) {
                        q(a.ui.autocomplete.filter(suggestions, p.term.split(/,\s*/).pop()))
                    },
                    focus: function () {
                        return false
                    },
                    select: function (p, s) {
                        var r = this.value.split(/,\s*/);
                        var q = r.pop();
                        if (q.length > 0 && s.item.value.indexOf(q) == -1) {
                            r.push(q)
                        }
                        r.push(s.item.value);
                        r.push("");
                        this.value = r.join(", ");
                        return false
                    }
                });
                o.on("click", function () {
                    a(this).autocomplete("search", ".")
                })
            }
            a("#share-button").on("click", function (q) {
                c = a(l("share-dialog"));
                var r = j(this),
                    p = c.find(".social-buttons"),
                    s;
                p.empty();
                if (e && f) {
                    e.show()
                }
                if (!c.is(":visible")) {
                    if (shortenUrl) {
                        if (n === "") {
                            s = a("#page-link").val();
                            if (e && !g) {
                                e.setText(s)
                            }
                            a.ajax("/shorten/create", {
                                type: "POST",
                                data: {
                                    Url: s
                                },
                                success: function (t, v, u) {
                                    if (v === "success") {
                                        n = t.ShortUrl;
                                        a("#page-link").val(n);
                                        if (e && !g) {
                                            e.setText(n)
                                        }
                                        b.shareDownloadLink(n, p[0])
                                    } else {
                                        b.shareDownloadLink(s, p[0])
                                    }
                                },
                                error: function (u, v, t) {
                                    b.shareDownloadLink(s, p[0])
                                }
                            })
                        } else {
                            b.shareDownloadLink(n, p[0])
                        }
                    } else {
                        s = a("#page-link").val();
                        if (e && !g) {
                            e.setText(s)
                        }
                        b.shareDownloadLink(s, p[0])
                    }
                    c.css("top", r.y + a(this).height() + 5).css("left", r.x - (c.width() / 2) + (a(this).width() / 2) - 15).show();
                    d = this;
                    a(window).on("resize", resizeHandler);
                    a(document).on("keydown", escHandler);
                    a("#dark-dialog-overlay").width(Math.max(document.documentElement.clientWidth, document.documentElement.offsetWidth)).height(Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight)).appendTo(document.body).show().on("click", outerClickHandler);
                    if (e && !f) {
                        e.glue("copy-button", "copy-button-container");
                        f = true
                    }
                } else {
                    k()
                }
                q.preventDefault()
            });
            a("#add-recipients-button").on("click", function (p) {
                var q = j(this);
                c = a(l("add-recipients-dialog"));
                if (!c.is(":visible")) {
                    c.css("top", q.y + a(this).height() + 5).css("left", q.x - (c.width() / 2) + (a(this).width() / 2) - 15).show();
                    d = this;
                    a(window).on("resize", resizeHandler);
                    a(document).on("keydown", escHandler);
                    a("#dark-dialog-overlay").width(Math.max(document.documentElement.clientWidth, document.documentElement.offsetWidth)).height(Math.max(document.documentElement.clientHeight, document.documentElement.offsetHeight)).appendTo(document.body).show().on("click", outerClickHandler)
                } else {
                    k()
                }
                p.preventDefault()
            });
            a("#page-link").on("click", function () {
                this.select()
            });
            a("#addNewTransferRecipientsForm").on("submit", function (p) {
                p.preventDefault();
                var v = false;
                var t = a("#newRecipients").val();
                var s = goog.format.EmailAddress.parseList(t);
                var r = s.length;
                if (r > 50) {
                    alert("You have exceeded the maximum number of recipients.  The transfer will only be sent to the first 50 recipients.")
                }
                var q;
                var w = [];
                for (var u = 0; u < r && u < 50; u++) {
                    q = s[u].getAddress();
                    w.push(q)
                }
                if (w.length == 0) {
                    alert("Please enter an email address");
                    return false
                }
                var x = {
                    TransferId: a("#TransferId").val(),
                    Message: a("#newMessage").val(),
                    Emails: w
                };
                a.ajax("/transfers/addnewtransferrecipients", {
                    data: JSON.stringify(x),
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (y, z, A) {
                        showWait(a("body"), false);
                        if (y.Success) {
                            alert("Your transfer has been sent to the new recipients.");
                            a("#newRecipients").val("");
                            a("#newMessage").val("");
                            k()
                        } else {
                            if (y.Message === undefined || y.Message == "") {
                                alert("An error occurred when attempting to add the new recipients.")
                            } else {
                                alert(y.Message)
                            }
                        }
                    },
                    failure: function (A, z, y) {
                        showWait(a("body"), false);
                        alert("There was an error connecting to the server.  Please refresh the page manually.")
                    }
                });
                showWait(a("body"), true)
            })
        };
        return m
    }(b.Sharing || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.Upgrade = (function (r) {
        var u = [],
            e = [],
            t = [],
            v = null,
            f = null,
            o = false,
            n = false,
            w = false,
            s = {},
            C = function () {
                v = a("#choose_plan_select select[name='PlanTier'] :selected").val();
                if (o) {
                    a("#upgrade_step_nav #next").val((q() && n) ? "Create Account" : "Checkout")
                }
                if (c()) {
                    a("#AdditionalUsers").val(Math.max(0, f - k()));
                    a("#total_user_count").html(Math.max(f, k()))
                } else {
                    a("#AdditionalUsers").val(Math.max(0, e.CurrentUsers - k()));
                    a("#total_user_count").html(Math.max(e.CurrentUsers, k()))
                }
                a("#included_user_count").html(c() ? "multi" : "single");
                a("#plan_features_detail").html(t[v]);
                if (!c()) {
                    a("#add_user_button").button("disable")
                } else {
                    a("#add_user_button").button("enable")
                }
                a("#PlanPeriod").val(a("#choose_payment_type_radio input[name='PlanPeriodRadio']:checked").val());
                B()
            },
            B = function () {
                a("#promotion-info").load("/upgrade/promotiondetails", {
                    PlanTier: a("#choose_plan_select select :selected").val(),
                    PlanPeriod: a("#choose_payment_type_radio input[name='PlanPeriodRadio']:checked").val()
                }, function (D, E, F) {
                    A()
                });
                h();
                y(q())
            },
            h = function () {
                z();
                j(!c());
                g(q())
            },
            y = function (D) {
                if (a("#upgrade_form").formwizard("state").currentStep === "plan_info_step") {
                    if (D && n) {
                        a("#next").val("Create Account")
                    } else {
                        a("#next").val("Checkout")
                    }
                }
            },
            A = function () {
                a.ajax({
                    url: "/upgrade/orderdetails",
                    type: "POST",
                    data: {
                        PlanTier: a("#choose_plan_select select :selected").val(),
                        PlanPeriod: a("#choose_payment_type_radio input[name='PlanPeriodRadio']:checked").val(),
                        CouponCode: a("#CouponCode").val(),
                        AdditionalUsers: a("#AdditionalUsers").val(),
                        PromotionId: a("#promotion-info input[name'PromotionIdRadio']:checked").val()
                    },
                    beforeSubmit: function () {
                        if (!o) {
                            showIndicator(a("#order_summary"))
                        }
                    },
                    complete: function (E, D) {
                        if (!o) {
                            hideIndicator(a("#order_summary"));
                            y(q())
                        }
                    },
                    success: function (D) {
                        a("#next").button("enable");
                        if (!o) {
                            a("#rate_details").html(D);
                            h();
                            y(q())
                        }
                        if (o) {
                            ajaxDialog.dialog("option", "position", ajaxDialog.dialog("option", "position"))
                        }
                        d()
                    },
                    error: function (F, E, D) {
                        a("#next").button("disable");
                        if (F.readyState == 0 || F.status == 0) {
                            return
                        } else {
                            if (F.status == 400) {
                                a("#rate_details").empty();
                                x(getValidationSummary(a.parseJSON(F.responseText)))
                            } else {
                                displayError(F.responseText, F.status)
                            }
                        }
                    }
                })
            },
            z = function () {
                var D = "&nbsp;";
                if (v !== "Free") {
                    D = "(Save 20% with Yearly)"
                }
                a("#percentDiscount").html(D)
            },
            j = function (D) {
                if (D) {
                    a("#add_user_button").button("disable");
                    a("#remove_user_button").button("disable");
                    a("#add_remove_users_section").slideUp()
                } else {
                    a("#add_user_button").button("enable");
                    a("#remove_user_button").button("enable");
                    a("#add_remove_users_section").slideDown()
                }
            },
            g = function (D) {
                a("#choose_payment_type_radio").buttonset("option", "disabled", D);
                a("#apply_coupon_button").button("option", "disabled", D);
                if (D) {
                    a("#CouponCode").val("").prop("disabled", true).addClass("ui-state-disabled");
                    a("#billing_cycle_section").slideUp();
                    a("#coupon_code_section").slideUp()
                } else {
                    a("#CouponCode").prop("disabled", false).removeClass("ui-state-disabled");
                    a("#billing_cycle_section").slideDown();
                    a("#coupon_code_section").slideDown()
                }
            },
            m = function (F) {
                var E = a("#AdditionalUsers"),
                    D = parseInt(E.val());
                if (D + F < 0) {
                    alert("You have already reached the minimum number of users for the selected plan.")
                } else {
                    if (!c() && D + F > 0) {
                        alert("You have already reached the maximum number of users for the selected plan.")
                    } else {
                        E.val(D + F);
                        a("#total_user_count").html(D + F + k())
                    }
                }
            },
            k = function () {
                return u[v].UserQuota
            },
            q = function () {
                return u[v].PlanTierName == "Free"
            },
            p = function () {
                return (a("#choose_plan_select select :selected").val() != s.PlanTier || a("#choose_payment_type_radio input[name='PlanPeriodRadio']:checked").val() != s.PlanPeriod || a("#CouponCode").val() != s.CouponCode || a("#AdditionalUsers").val() != s.AdditionalUsers)
            },
            c = function () {
                return u[v].AllowAdditionalUsers
            },
            x = function (E) {
                var D = a("#select_plan_validation_errors");
                D.html(E);
                if (!D.is(":visible")) {
                    D.slideDown()
                }
            },
            d = function () {
                a("#select_plan_validation_errors").slideUp("slow", function () {
                    clearValidationSummary()
                })
            },
            l = function (D) {
                if (!D) {
                    a("#Token").val("");
                    a("#PayerId").val("")
                }
            };
        r.paypalCancel = function () {
            dg.closeFlow()
        };
        r.upgradeDialogInit = function () {
            o = true;
            b.watermark(ajaxDialog);
            ajaxDialog.css("overflow", "hidden").dialog({
                width: 650,
                title: "",
                dialogClass: "ui-dialog-title-unstyled",
                zIndex: 100002,
                buttons: {},
                close: function (D, E) {
                    a(this).css("overflow", "auto")
                }
            });
            a("#openid-login li").click(function () {
                a("body").mask("Redirecting...")
            })
        };
        r.upgradeBegin = function (D, E) {
            a.ajax({
                url: "/upgrade/validateplaninfo",
                data: E.data,
                dataType: "json",
                type: "POST",
                async: false,
                success: function (F) {
                    d();
                    if (F.Success) {
                        if (!F.SkipBillingInfo) {
                            if (F.UsePayPal) {
                                D.abort();
                                dg.startFlow(F.PayPalRedirectUrl);
                                return false
                            } else {
                                D.abort();
                                ajaxDialog.dialog("destroy");
                                a("body").mask("Redirecting...");
                                window.location.href = "/signup/selectplan?step=billing#_upgrade_form=billing_info_step";
                                return false
                            }
                        }
                        return true
                    } else {
                        D.abort();
                        return false
                    }
                },
                error: function (H, G, F) {
                    D.abort();
                    if (H.readyState == 0 || H.status == 0) {
                        return true
                    } else {
                        if (H.status == 400) {
                            x(getValidationSummary(a.parseJSON(H.responseText)));
                            return false
                        } else {
                            displayError(H.responseText, H.status);
                            return false
                        }
                    }
                }
            })
        };
        r.upgradeSuccess = function (D, E, F) {
            if (D.Success) {
                ajaxDialog.dialog("destroy");
                if (D.ReturnUrl) {
                    window.location.replace(D.ReturnUrl)
                } else {
                    window.location.replace("/")
                }
            }
        };
        r.upgradeFailure = function (F, E, D) {
            if (F.readyState == 0 || F.status == 0) {
                return true
            } else {
                if (F.status == 400) {
                    x(getValidationSummary(a.parseJSON(F.responseText)));
                    return false
                } else {
                    displayError(F.responseText, F.status);
                    return false
                }
            }
        };
        r.initPromotions = function () {
            a('input[name="PromotionIdRadio"]').change(function () {
                var D = a(this);
                if (D.is(":checked")) {
                    a("#PromotionId").val(D.val());
                    a("#CouponCode").valid();
                    a("#CouponCode").val(D.data("coupon-code"));
                    A()
                }
            });
            a("#CouponCode").val(a('input[name="PromotionIdRadio"]:checked').data("coupon-code"))
        };
        r.init = function (D) {
            u = D.planDetails;
            e = D.currentDetails;
            t = D.planDescriptions;
            v = D.planTier;
            f = D.currentUsers;
            n = D.isAnonymous;
            w = D.showShippingInfo;
            s = {
                PlanTier: a("#choose_plan_select select :selected").val(),
                PlanPeriod: a("#choose_payment_type_radio input[name='PlanPeriodRadio']:checked").val(),
                CouponCode: a("#CouponCode").val(),
                AdditionalUsers: a("#AdditionalUsers").val()
            };
            a("#choose_plan_select select").change(C);
            a("#choose_payment_type_radio").buttonset();
            a("#choose_payment_type_radio input[name='PlanPeriodRadio']").change(function () {
                a("#PlanPeriod").val(a(this).val());
                B()
            });
            a("#show_promo_code").click(function (E) {
                E.preventDefault();
                a(this).hide();
                a("#coupon_code_container").show()
            });
            a("#add_user_button").button({
                icons: {
                    primary: "ui-icon-plusthick"
                },
                text: false
            }).click(function (E) {
                E.preventDefault();
                if (!a(this).button("option", "disabled")) {
                    m(1);
                    A()
                }
            });
            a("#remove_user_button").button({
                icons: {
                    primary: "ui-icon-minusthick"
                },
                text: false
            }).click(function (E) {
                E.preventDefault();
                if (!a(this).button("option", "disabled")) {
                    m(-1);
                    A()
                }
            });
            a("#add_remove_users_buttons").find(".users-buttonset").buttonset();
            a(".users-buttonset .ui-button").each(function () {
                a(this).removeClass("ui-corner-all")
            });
            a("#CouponCode").change(A);
            a("#paypalCheckoutButton").click(function (E) {
                E.preventDefault();
                a("#UsePaypal").val(true);
                a("#upgrade_form").formwizard("next")
            });
            a("#next, #back").button();
            a("#select_plan_configuration .ui-button").addClass("ui-corner-all");
            a("#UseBillingAddress").change(function () {
                if (a(this).prop("checked")) {
                    a("#shipping-address input, #shipping-address select").prop("disabled", true);
                    a("#ShippingAddressFirstName").val(a("#CCFirstName").val());
                    a("#ShippingAddressLastName").val(a("#CCLastName").val());
                    a("#ShippingAddressLine1").val(a("#BillingAddressLine1").val());
                    a("#ShippingAddressLine2").val(a("#BillingAddressLine2").val());
                    a("#ShippingAddressCity").val(a("#BillingAddressCity").val());
                    a("#ShippingAddressState").val(a("#BillingAddressState").val());
                    a("#ShippingAddressZip").val(a("#BillingAddressZip").val())
                } else {
                    a("#shipping-address input, #shipping-address select").prop("disabled", false);
                    a("#ShippingAddressFirstName").val("");
                    a("#ShippingAddressLastName").val("");
                    a("#ShippingAddressLine1").val("");
                    a("#ShippingAddressLine2").val("");
                    a("#ShippingAddressCity").val("");
                    a("#ShippingAddressState").val("");
                    a("#ShippingAddressZip").val("")
                }
            });
            a("#PlanTier").selectmenu({
                width: 300,
                menuWidth: 320,
                format: function (H) {
                    var G = H,
                        E = [{
                            find: /^([^\-]+) \- /g,
                            rep: '<span class="ui-selectmenu-item-header">$1</span>'
                        }, {
                            find: /([^\|><]+) \| /g,
                            rep: '<span class="ui-selectmenu-item-content">$1</span>'
                        }, {
                            find: /([^\|><]+)$/g,
                            rep: '<span class="ui-selectmenu-item-content">$1</span>'
                        }];
                    for (var F in E) {
                        G = G.replace(E[F].find, E[F].rep)
                    }
                    return G
                }
            });
            a("#upgrade_form").bind("step_shown", function (F, E) {
                if (E.isBackNavigation) {
                    d()
                }
                if (E.currentStep === "shipping_info_step") {
                    if (a("#UseBillingAddress").prop("checked")) {
                        a("#shipping-address input, #shipping-address select").prop("disabled", true)
                    }
                }
                if (E.currentStep === "billing_info_step") {
                    a("#plan_info_step").find("input,select,textarea").prop("disabled", true)
                }
                l(!E.isFirstStep)
            });
            a("#upgrade_form").formwizard({
                formPluginEnabled: true,
                validationEnabled: true,
                historyEnabled: true,
                focusFirstInput: true,
                disableUIStyles: true,
                textSubmit: "Place Order",
                stepTextNext: {
                    plan_info_step: (q() && n) ? "Create Account" : "Checkout",
                    billing_info_step: "Continue",
                    shipping_info_step: "Continue",
                    review_order_step: "Place Order"
                },
                formOptions: {
                    beforeSubmit: function (E) {
                        a("#next").button("disable");
                        a("body").mask("Processing...")
                    },
                    complete: function () {
                        a("#next").button("enable")
                    },
                    success: function (E) {
                        if (E.Success) {
                            window.location = E.ReturnUrl
                        }
                    },
                    error: function (G, F, E) {
                        a("body").unmask();
                        if (G.readyState == 0 || G.status == 0) {
                            return true
                        } else {
                            if (G.status == 400) {
                                x(getValidationSummary(a.parseJSON(G.responseText)));
                                return false
                            } else {
                                displayError(G.responseText, G.status);
                                return false
                            }
                        }
                    },
                    dataType: "json"
                },
                remoteAjax: {
                    plan_info_step: {
                        url: "/upgrade/validateplaninfo",
                        datatype: "json",
                        beforeSubmit: function () {},
                        complete: function () {},
                        success: function (E) {
                            d();
                            if (E.Success) {
                                if (E.UsePayPal && !E.SkipBillingInfo) {
                                    dg.startFlow(E.PayPalRedirectUrl);
                                    return false
                                } else {
                                    if (E.SkipBillingInfo) {
                                        a("#review_order_step").after(a("#billing_info_step"));
                                        a("#editCreditCardSection").show()
                                    } else {
                                        a("#plan_info_step").after(a("#billing_info_step"));
                                        a("#editCreditCardSection").hide()
                                    }
                                }
                                if (!E.ShowShippingInfo && !w) {
                                    a("#review_order_step").after(a("#shipping_info_step"))
                                } else {
                                    a("#review_order_step").before(a("#shipping_info_step"))
                                }
                                a("#upgrade_form").formwizard("update_steps");
                                return true
                            } else {
                                return false
                            }
                        },
                        error: function (G, F, E) {
                            if (G.readyState == 0 || G.status == 0) {
                                return true
                            } else {
                                if (G.status == 400) {
                                    x(getValidationSummary(a.parseJSON(G.responseText)));
                                    return false
                                } else {
                                    displayError(G.responseText, G.status);
                                    return false
                                }
                            }
                        }
                    },
                    billing_info_step: {
                        url: "/upgrade/validatebillinginfo",
                        dataType: "json",
                        success: function (E) {
                            d();
                            if (E.Success) {
                                if (a("#promotion-info input:checked").attr("data-require-shipping") === "True" || false) {
                                    a("#billing_info_step").after(a("#shipping_info_step").addClass("step"));
                                    a("#shipping-address input, #shipping-address select").prop("disabled", true);
                                    a("#ShippingAddressFirstName").val(a("#CCFirstName").val());
                                    a("#ShippingAddressLastName").val(a("#CCLastName").val());
                                    a("#ShippingAddressLine1").val(a("#BillingAddressLine1").val());
                                    a("#ShippingAddressLine2").val(a("#BillingAddressLine2").val());
                                    a("#ShippingAddressCity").val(a("#BillingAddressCity").val());
                                    a("#ShippingAddressState").val(a("#BillingAddressState").val());
                                    a("#ShippingAddressZip").val(a("#BillingAddressZip").val())
                                } else {
                                    a("#review_order_step").after(a("#shipping_info_step").removeClass("step"))
                                }
                                return true
                            } else {
                                return false
                            }
                        },
                        error: function (G, F, E) {
                            if (G.readyState == 0 || G.status == 0) {
                                return true
                            } else {
                                if (G.status == 400) {
                                    x(getValidationSummary(G.responseText));
                                    return false
                                } else {
                                    displayError(G.responseText, G.status);
                                    return false
                                }
                            }
                        }
                    },
                    shipping_info_step: {
                        url: "/upgrade/validateshippinginfo",
                        dataType: "json",
                        success: function (E) {
                            d();
                            if (E.Success) {
                                return true
                            } else {
                                return false
                            }
                        },
                        error: function (G, F, E) {
                            if (G.readyState == 0 || G.status == 0) {
                                return true
                            } else {
                                if (G.status == 400) {
                                    x(getValidationSummary(G.responseText));
                                    return false
                                } else {
                                    displayError(G.responseText, G.status);
                                    return false
                                }
                            }
                        }
                    }
                }
            });
            a.validator.unobtrusive.parse("#signup_form");
            B()
        };
        return r
    }(b.Upgrade || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (b, a) {
    b.Users = (function (k) {
        var f = null,
            h = null,
            g = null,
            j = null;
        var e = function () {
                if (j != -1) {
                    f.jqGrid("restoreRow", j);
                    j = -1
                }
                var p = a(this).val().toLowerCase();
                var o = false;
                for (row = 0; row < g.length; row++) {
                    o = false;
                    a.each(g[row], function (q, r) {
                        if (r.toLowerCase().indexOf(p) != -1) {
                            o = true;
                            return
                        }
                    });
                    rowId = g[row]["id"];
                    if (o) {
                        f.find("#" + rowId).show()
                    } else {
                        f.find("#" + rowId).hide()
                    }
                }
            };
        var l = function (q, p, o) {
                f.jqGrid("setGridParam", "datatype", "json");
                f.trigger("reloadGrid")
            };
        var c = function (t, q) {
                var s = true;
                var o = "";
                var r = a.parseJSON(t.responseText);
                if (t.status != 200) {
                    s = false;
                    o = this.errorTextFormat(t)
                }
                if (r.LicenseSummary) {
                    n(r.LicenseSummary)
                }
                var p;
                if (r.NewId) {
                    p = r.NewId
                }
                return [s, o, p]
            };
        var d = function (o) {
                if (o && o !== j) {
                    a(this).jqGrid("restoreRow", j);
                    j = o
                }
                a(this).jqGrid("editRow", o, true, null, null, null, null, null, b.JqGrid.errorFunc, b.JqGrid.restoreRowFocus)
            };
        var m = function (o, p, q) {
                return b.formatSize(o)
            };
        var n = function (o) {
                if (o !== undefined) {
                    if (o.Remaining <= 0) {
                        a("#add_grid-users").addClass("ui-state-disabled");
                        a(".add-user").button("disable")
                    } else {
                        a("#add_grid-users").removeClass("ui-state-disabled");
                        a(".add-user").button("enable")
                    }
                    if (o.Active == 1) {
                        a("#del_grid-users").addClass("ui-state-disabled");
                        a("#edit_grid-users").addClass("ui-state-disabled")
                    } else {
                        a("#del_grid-users").removeClass("ui-state-disabled");
                        a("#edit_grid-users").removeClass("ui-state-disabled")
                    }
                    a("#totalusers").html(o.Total);
                    a("#activeusers").html(o.Active);
                    a("#remainingusers").html(o.Remaining)
                }
            };
        k.initManageGrid = function () {
            b.JqGrid.initGridDefaults({
                objectType: "User"
            });
            f = a("#grid-users");
            f.jqGrid({
                url: "/users/managedata",
                sortname: "FirstName",
                loadonce: true,
                sortorder: "asc",
                sortable: true,
                datatype: "json",
                mtype: "GET",
                pginput: true,
                pgbuttons: true,
                viewrecords: true,
                caption: '<input type="search" id="filter-users" title="Search..." results="0" />',
                pager: "#pager-users",
                height: "100%",
                colNames: ["User Id", "First", "Last", "Email", "Role", "Status", "Transfers", "Size", "Last Upload"],
                colModel: [{
                    name: "id",
                    index: "id",
                    hidden: true
                }, {
                    name: "FirstName",
                    index: "FirstName",
                    width: 50,
                    editable: true,
                    editoptions: {
                        required: true
                    }
                }, {
                    name: "LastName",
                    index: "LastName",
                    width: 50,
                    editable: true,
                    editoptions: {
                        required: true
                    }
                }, {
                    name: "Email",
                    index: "Email",
                    width: 135,
                    editable: true,
                    editoptions: {
                        required: true,
                        email: true
                    }
                }, {
                    name: "UserType",
                    index: "UserType",
                    width: 55,
                    align: "center",
                    editable: true,
                    edittype: "select",
                    editoptions: {
                        value: "General:General;DropBox:DropBox;Admin:Admin",
                        required: true
                    }
                }, {
                    name: "UserStatus",
                    index: "UserStatus",
                    width: 65,
                    align: "center",
                    editable: true,
                    edittype: "select",
                    editoptions: {
                        value: "Active:Active;Suspended:Suspended",
                        required: true
                    }
                }, {
                    name: "activetransfers",
                    index: "activetransfers",
                    width: 45,
                    align: "center"
                }, {
                    name: "activestorage",
                    index: "activestorage",
                    width: 40,
                    align: "right",
                    formatter: m
                }, {
                    name: "lastuploaddate",
                    index: "lastuploaddate",
                    width: 60,
                    align: "right"
                }],
                jsonReader: {
                    userdata: "LicenseSummary"
                },
                loadComplete: function (o) {
                    n(o.LicenseSummary);
                    h = a("#filter-users");
                    h.keyup(e);
                    h.watermark(h.attr("title"), "watermark");
                    h.click(function () {
                        if (h.val().length == 0) {
                            e.call(this)
                        }
                    })
                },
                onSelectRow: function (o, p) {
                    if (j != -1) {
                        a(this).jqGrid("saveRow", j);
                        j = -1
                    }
                },
                ondblClickRow: d,
                gridComplete: function () {
                    g = a(this).jqGrid("getRowData")
                },
                editurl: "/users/update",
                width: 780
            }).navGrid("#pager-users", {
                view: false,
                search: false
            }, {
                afterSubmit: c,
                afterComplete: l
            }, {
                url: "/users/add",
                afterSubmit: c,
                afterComplete: l
            }, {
                url: "/users/delete",
                afterSubmit: c,
                afterComplete: l
            }, {}, {});
            f.jqGrid("bindKeys", {
                onSpace: d
            });
            a(".add-user").button().click(function () {
                f.jqGrid("editGridRow", "new", {
                    url: "/users/add",
                    afterSubmit: c,
                    afterComplete: l
                })
            })
        };
        return k
    }(b.Users || {}))
}(this.TBF = this.TBF || {}, jQuery));
(function (a) {
    a.widget("tbf.autocompletecategory", a.ui.autocomplete, {
        _renderMenu: function (e, c) {
            var d = this,
                b = undefined;
            a.each(c, function (f, g) {
                if (g.category.length > 0 && g.category != b) {
                    e.append("<li class='ui-autocomplete-category'>" + g.category + "</li>");
                    b = g.category
                }
                d._renderItem(e, g)
            })
        },
        delay: 0,
        focus: function () {
            return false
        }
    });
    a.widget("tbf.tagit", {
        widgetEventPrefix: "tagit.",
        options: {
            tagSource: [],
            triggerKeys: ["enter", "space", "comma", "tab", "period", "semicolon"],
            initialTags: [],
            minLength: 0,
            select: false,
            placeholder: "Email Address(es)",
            allowNewTags: true,
            emptySearch: true,
            maxTags: 0,
            parseValue: function (f) {
                var d = [];
                var e = goog.format.EmailAddress.parseList(f);
                var c = "";
                for (var b = 0; b < e.length; b++) {
                    c = e[b].getName();
                    if (c == "") {
                        c = e[b].getAddress()
                    }
                    d.push({
                        label: c,
                        value: e[b].getAddress()
                    })
                }
                return d
            }
        },
        _keys: {
            backspace: [8],
            enter: [13],
            space: [32],
            comma: [44, 188],
            tab: [9],
            period: [46],
            semicolon: [59]
        },
        _create: function () {
            var c = this;
            this.tagsArray = [];
            this.timer = null;
            if (!this.element.hasClass("tagit")) {
                this.element.addClass("tagit")
            }
            this.element.children("li").each(function () {
                c.options.initialTags.push(a(this).text())
            });
            this.element.html('<li class="tagit-new"><input class="tagit-input" type="text" /></li>');
            this.input = this.element.find(".tagit-input").attr("placeholder", c.options.placeholder).autoGrowInput({
                comfortZone: 20,
                minWidth: 75,
                maxWidth: 20000
            });
            a(this.element).bind("click.tagit", function (d) {
                if (a(d.target).hasClass("tagit-close")) {
                    var f = a(d.target).parent().data("tag");
                    a(d.target).parent().fadeOut("slow", function () {
                        a(d.target).parent().remove()
                    });
                    c._popTag(f)
                } else {
                    if (!a(d.target).parent().hasClass("ui-menu-item")) {
                        c.input.focus();
                        if (c.options.emptySearch && c.input.val() == "" && c.input.autocompletecategory != undefined) {
                            c.input.autocompletecategory("search", "")
                        }
                    }
                }
            });
            var b = this.options.select;
            this.options.appendTo = this.element;
            this.options.source = this.options.tagSource;
            this.options.select = function (d, e) {
                clearTimeout(c.timer);
                c._addTag(e.item);
                return false
            };
            this.input.autocompletecategory(this.options);
            this.options.select = b;
            this.input.keydown(function (d) {
                var f = c.element.children(".tagit-choice:last");
                if (d.which == c._keys.backspace) {
                    return c._backspace(f)
                }
                if (c._isInitKey(d.which)) {
                    d.preventDefault();
                    if (c.options.allowNewTags && a(this).val().length >= c.options.minLength) {
                        c._addTag(a(this).val())
                    } else {
                        if (!c.options.allowNewTags) {
                            c.input.val("")
                        }
                    }
                }
                if (f.hasClass("selected")) {
                    f.removeClass("selected")
                }
                c.lastKey = d.which
            });
            this.input.blur(function (d) {
                var f = a(this).val();
                if (c.options.allowNewTags && f.length > 0) {
                    a(this).autocompletecategory("close");
                    c.timer = setTimeout(function () {
                        c._addTag(f)
                    }, 400)
                }
                a(this).val("");
                return false
            });
            this.input.bind("paste", function (d) {
                var f = a(this);
                if (d.type == "paste") {
                    a(this).autocompletecategory("close");
                    setTimeout(function () {
                        c._addTag(f.val())
                    }, 1)
                }
            });
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, "")
            };
            if (this.options.select) {
                this.element.after('<select class="tagit-hiddenSelect" name="' + this.element.attr("name") + '" multiple="multiple"></select>');
                this.select = this.element.siblings(".tagit-hiddenSelect")
            }
            this._initialTags()
        },
        _popSelect: function (b) {
            this.select.children('option[value="' + b + '"]').remove();
            this.select.change()
        },
        _addSelect: function (b) {
            this.select.append('<option selected="selected" value="' + b + '">' + b + "</option>");
            this.select.change()
        },
        _popTag: function (c) {
            a.inArray(c, this.tagsArray);
            if (c == undefined) {
                c = this.tagsArray.pop()
            } else {
                var b = (a.inArray(c, this.tagsArray) == -1 ? this.tagsArray.length - 1 : a.inArray(c, this.tagsArray));
                this.tagsArray.splice(b, 1)
            }
            if (this.options.select) {
                this._popSelect(c)
            }
            if (this.tagsArray.length == 0) {
                this.input.attr("placeholder", this.options.placeholder)
            }
            this._trigger("tagremoved")
        },
        _addTag: function (d) {
            if (typeof d === "string") {
                d = this.options.parseValue(d)
            }
            if (a.isPlainObject(d)) {
                d = [d]
            }
            this.input.val("");
            var e;
            for (var b = 0; b < d.length; b++) {
                e = d[b];
                if (e.value == "" || this._exists(e)) {
                    return false
                }
                var c = a('<li class="tagit-choice">' + e.label + '<a class="tagit-close">x</a></li>');
                c.data("tag", e);
                c.insertBefore(this.input.parent());
                this.input.val("");
                this.tagsArray.push(e);
                this._trigger("tagadded", null, e)
            }
            if (this.tagsArray.length > 0) {
                this.input.removeAttr("placeholder")
            }
            return true
        },
        _validateTags: function (c) {
            var b = true;
            if (this.options.maxTags != 0 && this.tagsArray.length >= this.options.maxTags) {
                b = false
            }
            return b
        },
        _exists: function (b) {
            if (this.tagsArray.length == 0 || a.inArray(b, this.tagsArray) == -1) {
                return false
            }
            return true
        },
        _isInitKey: function (c) {
            var d = "";
            for (var b in this._keys) {
                if (a.inArray(c, this._keys[b]) != -1) {
                    d = b
                }
            }
            if (a.inArray(d, this.options.triggerKeys) != -1) {
                return true
            }
            return false
        },
        _removeTag: function () {
            this._popTag();
            this.element.children(".tagit-choice:last").remove()
        },
        _backspace: function (b) {
            if (this.input.val() == "") {
                if (this.lastKey == this._keys.backspace) {
                    this._popTag();
                    b.remove();
                    this.lastKey = null
                } else {
                    b.addClass("selected");
                    this.lastKey = this._keys.backspace
                }
            }
            return true
        },
        _initialTags: function () {
            var b = this;
            if (this.options.initialTags.length != 0) {
                this.options.initialTags.each(function (c) {
                    b._addTag(c)
                })
            }
        },
        tags: function () {
            return this.tagsArray
        },
        destroy: function () {
            this.input.autocompletecategory("destroy");
            this.tagsArray = [];
            a.Widget.prototype.destroy.apply(this, arguments)
        }
    })
})(jQuery);
(function (c, a) {
    var b = function () {
            var s = window.navigator.userAgent.toLowerCase(),
                t = /(webkit)[ \/]([\w.]+)/.exec(s) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) || [],
                n = t[1] || "",
                q = parseFloat(t[2]) || 0,
                u = 0,
                z = t[2] ? t[2].split(".") : [];
            if (z.length > 2) {
                u = parseFloat(z.slice(2).join(".")) || 0
            }
            var x = /(android)[ ]([\w.]+)/.exec(s) || [],
                w = x[1] ? parseFloat(x[2]) : null,
                r = document.createElement("input");
            r.type = "file";
            var A = "src" in document.createElement("iframe") && !r.disabled && !(n == "webkit" && q < 523) && (!w || w >= 2.2),
                y = n == "msie" && q > 5 || n == "opera" && q >= 9 || n == "mozilla" && q > 1.7 || n == "webkit" && q > 523;
            if (n == "msie" && q < 9) {
                try {
                    r.style.display = "none";
                    document.appendChild(r);
                    var C = r.filters;
                    document.removeChild(r)
                } catch (D) {
                    y = false
                }
            }
            var B = n == "webkit" && s.indexOf("chrome") == -1,
                v = {
                    fileInputMultiple: "multiple" in r && !(n == "webkit" && window.navigator.platform.toLowerCase().indexOf("win") != -1 && q == 534.5),
                    folderSelection: "webkitdirectory" in r
                };
            v.dragDrop = v.fileInputMultiple && "draggable" in document.createElement("span") && !B;
            return v
        }();
    a.fn.inputHash = function () {
        var d = this.find(":input");
        var e = {};
        d.each(function () {
            var f = this.id || this.name;
            if (f.indexOf(".") > 0) {
                f = f.split(".")
            }
            if (f.length > 0) {
                var j;
                if (this.type == "radio" || this.type == "checkbox") {
                    j = a(this).attr("checked") ? true : false
                } else {
                    j = a(this).val()
                }
                if (a.isArray(f)) {
                    var g = f[0];
                    var h = f[1];
                    if (!e[g]) {
                        e[g] = {}
                    }
                    if (e[g][h]) {
                        if (!a.isArray(e[g][h])) {
                            e[g][h] = [e[g][h]]
                        }
                        e[g][h].push(j)
                    } else {
                        e[g][h] = j
                    }
                } else {
                    if (e[f]) {
                        if (!a.isArray(e[f])) {
                            e[f] = [e[f]]
                        }
                        e[f].push(j)
                    } else {
                        e[f] = j
                    }
                }
            }
        });
        return e
    };
    a.widget("tbf.slickupload", {
        widgetEventPrefix: "slickupload.",
        options: {
            prefix: "tbf",
            maxFileSize: 0,
            maxFilesPerTransfer: 0,
            uploadThreads: 1
        },
        $self: null,
        $slickUpload: null,
        $uploadConnector: null,
        $fileSelector: null,
        $folderSelector: null,
        $dropZone: null,
        $fileList: null,
        $fileListTemplate: null,
        $progressDisplay: null,
        $storageFrame: null,
        $uploadForm: null,
        $selectorContainer: null,
        $dropInstructions: null,
        $startUpload: null,
        $cancelUpload: null,
        $resetUpload: null,
        websiteId: 0,
        childWindow: null,
        kw: null,
        _create: function () {
            if (!b.dragDrop) {
                this.element.addClass("no-drag-drop")
            } else {
                this.element.addClass("drag-drop")
            }
            if (!b.folderSelection) {
                this.element.addClass("no-folder")
            }
            this._bindComponents();
            this._bindStorageFrame();
            this._bindNavigation();
            a(".tbf-filelistitem", this.$self).live({
                mouseover: function () {
                    a(this).addClass("ui-state-highlight ui-no-border")
                },
                mouseout: function () {
                    a(this).removeClass("ui-state-highlight ui-no-border")
                }
            })
        },
        _bindComponents: function () {
            this.$self = this.element;
            this.$slickUpload = this.element.find("#slickUpload");
            this.$uploadConnector = this.element.find("#uploadConnector");
            this.$fileSelector = this.element.find("#fileSelector");
            this.$folderSelector = this.element.find("#folderSelector");
            this.$dropZone = this.element.find("#dropZone");
            this.$fileList = this.element.find("#fileList");
            this.$fileListTemplate = this.element.find("#fileListTemplate");
            this.$progressDisplay = this.element.find("#progressDisplay");
            this.$storageFrame = this.element.find("#storageFrame");
            this.$selectorContainer = this.element.find("#selectorContainer");
            this.$dropInstructions = this.element.find("#dropInstructions");
            this.websiteId = this.element.find("#WebSiteId").val();
            this.$dropInstructions.removeClass("ui-helper-notvisible");
            this.$selectorContainer.removeClass("ui-helper-notvisible")
        },
        _bindStorageFrame: function () {
            var f = this;
            try {
                var e = this.$storageFrame[0].contentWindow.kw;
                if (e) {
                    this.bindStorageFrame(e)
                } else {
                    this.$storageFrame.load(function () {
                        a(this).unbind("load");
                        f.bindStorageFrame(f.$storageFrame[0].contentWindow.kw)
                    })
                }
            } catch (d) {
                this.$storageFrame.load(function () {
                    a(this).unbind("load");
                    f.bindStorageFrame(f.$storageFrame[0].contentWindow.kw)
                })
            }
        },
        stringifyArguments: function (d) {
            for (var e = 0; e < d.length; ++e) {
                d[e] = this.stringifySomething(d[e])
            }
            return d.join(", ")
        },
        stringifySomething: function (d, e) {
            var f = Array.prototype.slice;
            if (d === undefined) {
                return "undefined"
            } else {
                if (d === null) {
                    return "null"
                } else {
                    if (d.constructor) {
                        if (d.constructor === Array) {
                            if (d.length < 3) {
                                return "[" + this.stringifyArguments(d) + "]"
                            } else {
                                return "[" + this.stringifyArguments(f.call(d, 0, 1)) + "..." + this.stringifyArguments(f.call(d, -1)) + "]"
                            }
                        } else {
                            if (d.constructor === Function) {
                                return "#function"
                            } else {
                                if (d.constructor === String) {
                                    return '"' + d + '"'
                                } else {
                                    if (d.constructor === Object || typeof d == "object") {
                                        return "#object"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return d.toString()
        },
        stringifyObject: function (e) {
            var f = "";
            f = e.constructor.name + " { ";
            for (var d in e) {
                f += d + ": " + this.stringifySomething(e[d], true) + ",\n"
            }
            return f + "}"
        },
        sendErrorLog: function (f, d) {
            if (f) {
                var e = this.createXMLHTTPObject();
                if (!e) {
                    return
                }
                e.open("POST", window.logErrorUrl, true);
                e.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                e.send(JSON.stringify(d))
            }
        },
        createXMLHTTPObject: function () {
            var g, h = [function () {
                return new XMLHttpRequest()
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }];
            for (var f = 0; f < h.length; f++) {
                try {
                    g = h[f]();
                    this.createXMLHTTPObject = h[f];
                    return g
                } catch (d) {}
            }
        },
        bindStorageFrame: function (f) {
            var g = this;
            var e = document;
            g.kw = f;
            var d = a(g.$storageFrame[0].contentWindow.document);
            g.$uploadForm = d.find("#uploadForm");
            f.createLog = true;
            f.verboseLog = true;
            f.dropZoneWindow = window.top;
            if (window.IE7) {
                g.$fileSelector = d.find("#fileSelector")
            }
            f(function () {
                var k = g.$fileSelector.get(0);
                if (IE7) {
                    k = a(g.$storageFrame[0].contentWindow.document).find("#fileSelector").get(0)
                }
                var n = new f.UploadConnector({
                    element: g.$uploadConnector.get(0),
                    uploadHandlerUrl: "/SlickUpload.axd",
                    autoCompleteAfterLastFile: true,
                    autoUploadOnSubmit: true,
                    concurrentMaxFiles: g.options.uploadThreads,
                    confirmNavigateDuringUploadMessage: "Not so fast, your transfer isn't quite finished yet.  If you leave this page your transfer will be canceled.  Do you still want to leave?",
                    uploadForm: a(g.$storageFrame[0].contentWindow.document).find("#uploadForm").get(0),
                    onBeforeSessionStart: function (o) {
                        g._update("beforesessionstart", o)
                    },
                    onUploadSessionStarted: function (o) {
                        g._update("sessionstarted", o)
                    },
                    onUploadFileStarted: function (o) {
                        g._update("filestarted", o)
                    },
                    onUploadFileEnded: function (o) {
                        g._update("fileended", o)
                    },
                    onUploadSessionProgress: function (o) {
                        g._update("sessionprogress", o)
                    },
                    onUploadSessionEnded: function (o) {
                        g._update("sessionended", o)
                    },
                    onBeforeSessionEnd: function (o) {
                        if (o.state == f.UploadState.Error && f.log) {
                            var q = [];
                            for (var p = 0; p < f.log.length; p++) {
                                q.push(g.stringifyArguments(f.log[p]))
                            }
                            g.sendErrorLog(window.logErrorUrl, {
                                message: "SlickUpload Error. Type=" + o.errorType,
                                messages: q
                            })
                        }
                        g._update("beforesessionend", o);
                        g.$cancelUpload.hide()
                    }
                }),
                    j = new f.FileSelector({
                        element: k,
                        folderElement: g.$folderSelector.get(0),
                        uploadConnector: n,
                        onFileAdded: function (o) {
                            var p = o.get_FileSelector().get_Files();
                            if (p.length > 0) {
                                g.$fileList.removeClass("no-files");
                                g.enable()
                            }
                            if (g.options.maxFilesPerTransfer > 0 && p.length >= g.options.maxFilesPerTransfer) {
                                g.$fileSelector.attr("disabled", "disabled");
                                g.$folderSelector.attr("disabled", "disabled");
                                g.$fileSelector.find("input").attr("disabled", "disabled")
                            }
                            g._update("fileadded", o)
                        },
                        onFileAdding: function (o) {
                            g._update("fileadding", o)
                        },
                        onFileValidated: function (o) {
                            var p = o.get_FileSelector().get_Files();
                            if (g.options.maxFilesPerTransfer > 0 && p.length >= g.options.maxFilesPerTransfer) {
                                g.$fileSelector.attr("disabled", "disabled");
                                g.$folderSelector.attr("disabled", "disabled");
                                g.$fileSelector.find("input").attr("disabled", "disabled")
                            }
                            g._update("filevalidated", o)
                        },
                        onFileRemoving: function (o) {
                            g._update("fileremoving", o)
                        },
                        onFileRemoved: function (o) {
                            var p = o.get_FileSelector().get_Files();
                            if (p.length == 0) {
                                g.$fileList.addClass("no-files");
                                g.disable()
                            }
                            if (g.options.maxFilesPerTransfer > 0 && p.length < g.options.maxFilesPerTransfer) {
                                g.$fileSelector.removeAttr("disabled");
                                g.$folderSelector.removeAttr("disabled");
                                g.$fileSelector.find("input").removeAttr("disabled")
                            }
                            g._update("fileremoved", o)
                        },
                        maxFileSize: g.options.maxFileSize / 1024,
                        showDropZoneOnDocumentDragOver: true,
                        dropZone: g.$dropZone.get(0)
                    }),
                    h = new f.FileList({
                        element: g.$fileList.get(0),
                        templateElement: g.$fileListTemplate.get(0),
                        fileSelector: j,
                        folderSelector: j
                    }),
                    l = new f.UploadProgressDisplay({
                        element: g.$progressDisplay.get(0),
                        uploadConnector: n,
                        showDuringUpload: false,
                        hideAfterUpload: false,
                        timeFormatter: function (q) {
                            q = parseFloat(q);
                            if (isFinite(q) && q > 0) {
                                var o = Math.floor(q / (60 * 60));
                                q -= o * (60 * 60);
                                var p = Math.floor(q / 60);
                                q = Math.floor(q - p * 60);
                                var r = "";
                                if (o > 0) {
                                    r += o + "h"
                                }
                                if (p > 0) {
                                    if (r.length > 0) {
                                        r += " "
                                    }
                                    r += p + "m"
                                }
                                if (q > 0) {
                                    if (r.length > 0) {
                                        r += " "
                                    }
                                    r += q + "s"
                                }
                                return r
                            } else {
                                if (q == 0) {
                                    return "Finalizing Upload."
                                }
                            }
                            return ""
                        }
                    }),
                    m = new f.SlickUpload({
                        element: g.$slickUpload.get(0),
                        fileSelector: j,
                        fileList: h,
                        uploadProgressDisplay: l,
                        uploadConnector: n
                    })
            });
            g.$fileSelector.click(function (h) {
                if (a(this).is("[disabled]")) {
                    h.preventDefault();
                    return false
                }
            });
            g.$folderSelector.click(function (h) {
                if (a(this).is("[disabled]")) {
                    h.preventDefault();
                    return false
                }
            });
            g.$fileSelector.find("input").click(function (h) {
                if (a(this).is("[disabled]")) {
                    h.preventDefault();
                    return false
                }
            })
        },
        _bindNavigation: function () {
            var d = this;
            this.$startUpload = this.element.find("#startUpload").button().click(function (f) {
                f.preventDefault();
                a(this).button("disable");
                setTimeout(function () {
                    d.start()
                }, 500)
            });
            this.$cancelUpload = this.element.find("#cancelUpload").click(function (f) {
                f.preventDefault();
                d.cancel()
            });
            this.$resetUpload = this.element.find("#resetUpload").click(function (f) {
                f.preventDefault();
                d.reset()
            })
        },
        _init: function () {},
        _update: function (e, d) {
            this._trigger(e, null, d)
        },
        enable: function () {
            this.$slickUpload.find('[data-action="start-upload"]').removeAttr("disabled");
            this._trigger("enable")
        },
        disable: function () {
            this.$slickUpload.find('[data-action="start-upload"]').attr("disabled", "disabled");
            this._trigger("disable")
        },
        info: function () {
            var k = this.kw("slickUpload").get_UploadSessionId(),
                e = this.kw("slickUpload").get_Files();
            var f = [];
            var l = 0;
            for (var g = 0; g < e.length; g++) {
                var d = e[g];
                f.push(new c.Model.TbfInitFile({
                    FileId: d.get_Id(),
                    TransferId: k,
                    WebSiteId: this.websiteId,
                    Name: d.get_Name(),
                    Size: d.get_Size(),
                    ContentType: d.get_Extension()
                }));
                l += d.get_Size()
            }
            var j = new c.Model.TbfInitTransfer({
                TransferId: k,
                WebSiteId: this.websiteId,
                Size: l
            });
            var h = new c.Model.TbfInitUpload({
                Transfer: j,
                Files: f
            });
            return h
        },
        stats: function () {
            var d = this.kw("slickUpload").get_Files();
            var g = 0;
            var e = 0;
            var f = d.length;
            if (d) {
                a.each(d, function () {
                    g += this.get_Size();
                    e = Math.max(e, this.get_Size())
                })
            }
            return {
                numFiles: f,
                maxFileSize: e,
                transferSize: g
            }
        },
        start: function () {
            var d = this;
            if (this._trigger("starting") === false) {
                d.$startUpload.button("enable");
                return
            }
            this.kw("slickUpload").start();
            this._trigger("start");
            return this
        },
        cancel: function () {
            this.kw("slickUpload").cancel();
            this._trigger("cancel");
            return this
        },
        reset: function () {
            this._trigger("reset")
        },
        destroy: function () {
            this.$slickUpload = null;
            this.$uploadConnector = null;
            this.$fileSelector = null;
            this.$folderSelector = null;
            this.$dropZone = null;
            this.$fileList = null;
            this.$fileListTemplate = null;
            this.$progressDisplay = null;
            this.$storageFrame = null;
            this.$uploadForm = null;
            this.$selectorContainer = null;
            this.$dropInstructions = null;
            a.Widget.prototype.destroy.apply(this, arguments)
        }
    });
    a.widget("tbf.regularuploader", {
        options: {
            maxFileSize: 0,
            maxTransferSize: 0,
            maxFilesPerTransfer: 0,
            maxRecipientsPerTransfer: 0,
            minRecipientsPerTransfer: 0,
            remainingStorage: 0,
            userContacts: null,
            userContactGroups: null
        },
        $slickUploader: null,
        $filesPanel: null,
        $filesValidation: null,
        $fileSize: null,
        $fileCount: null,
        $recipientCount: null,
        $recipientsPanel: null,
        $recipientValidation: null,
        $progressDisplay: null,
        $optionalSettingsPanel: null,
        $recipientList: null,
        recipientSource: null,
        _create: function () {
            this._bindUploader();
            this._bindRecipientBox();
            this._bindOptionalSettings();
            c.watermark(this.element);
            c.styleButtons(this.element)
        },
        _bindUploader: function () {
            var f = this,
                d = this.element,
                e = this.options;
            this.$filesPanel = this.element.find("#filesPanel");
            this.$filesValidation = this.$filesPanel.find(".error");
            this.$fileSize = d.find("#fileSize");
            this.$fileCount = d.find("#fileCount");
            this.$progressDisplay = d.find("#progressDisplay");
            this.$slickUploader = this.element.slickupload({
                maxFileSize: e.maxFileSize,
                maxFilesPerTransfer: e.maxFilesPerTransfer
            });
            d.bind("slickupload.beforesessionend", function () {
                d.find(".upload-details").slideDown("slow")
            }).bind("slickupload.filevalidated slickupload.fileremoved", function (g) {
                f._updateFileCount()
            }).bind("slickupload.reset slickupload.cancel", function () {
                var g = window.location.href;
                if (window.location.hash) {
                    g = g.replace(window.location.hash, "")
                }
                window.location.href = g
            }).bind("slickupload.starting", function () {
                return f._initializeUpload()
            })
        },
        _bindRecipientBox: function () {
            var h = this,
                d = this.element,
                g = this.options;
            this.$recipientsPanel = d.find("#recipientsPanel");
            this.$recipientCount = d.find("#recipientCount");
            var f = a.map(this.options.userContacts, function (k, j) {
                var l = k.FirstName + " " + k.LastName;
                if (!l || l == " ") {
                    l = k.Email
                }
                return {
                    id: k.ContactId,
                    label: l,
                    value: k.Email,
                    category: "Contacts"
                }
            }),
                e = a.map(this.options.userContactGroups, function (k, j) {
                    return {
                        id: k.ContactGroupId,
                        label: k.GroupName,
                        value: k.GroupName,
                        category: "Groups"
                    }
                });
            this.recipientSource = a.merge(a.merge([], f), e);
            this.$recipientList = d.find("#recipient-list");
            this.$recipientValidation = this.$recipientsPanel.find(".error");
            this.$recipientList.tagit({
                tagSource: this.recipientSource,
                maxTags: this.options.maxRecipientsPerTransfer
            });
            d.bind("tagit.tagremoved tagit.tagadded", function () {
                var j = h.$recipientList.tagit("tags").length;
                var k = "0";
                if (j) {
                    k = j
                }
                h.$recipientCount.html(k);
                if (h._validateMaxRecipients(j)) {
                    h.$recipientValidation.slideUp().html()
                }
            })
        },
        _bindOptionalSettings: function () {
            var h = this,
                d = this.element,
                g = this.options;
            this.$optionalSettingsPanel = this.element.find("#optionalSettingsPanel");
            var f = {
                head: "h3",
                group: "div, ul",
                active: "active",
                inactive: "inactive",
                show: function () {
                    a(this).parent().find("h3 span.ui-icon").addClass("ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-e");
                    this.animate({
                        opacity: "toggle",
                        height: "toggle"
                    }, 300)
                },
                hide: function () {
                    a(this).parent().find("h3 span.ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
                    this.animate({
                        opacity: "toggle",
                        height: "toggle"
                    }, 300)
                }
            };
            this.$optionalSettingsPanel.bind("show", function (k, j) {
                var l = a(k.target);
                l.attr("aria-hidden", false).prev().removeClass(f.inactive).addClass(f.active);
                if (j) {
                    l.show()
                } else {
                    f.show.call(l)
                }
            });
            this.$optionalSettingsPanel.bind("hide", function (k, j) {
                var l = a(k.target);
                l.attr("aria-hidden", true).prev().removeClass(f.active).addClass(f.inactive);
                if (j) {
                    l.hide()
                } else {
                    f.hide.call(l)
                }
            });
            var e = this.$optionalSettingsPanel.find("h3").first();
            if (!e.is(f.head)) {
                e = e.closest(f.head)
            }
            this.$optionalSettingsPanel.find("h3").first().on("click", function (k) {
                var l = a(k.target);
                if (!l.is(f.head)) {
                    l = l.closest(f.head)
                }
                var j = l.next(f.group);
                if (l.hasClass(f.active)) {
                    j.trigger("hide")
                } else {
                    j.trigger("show")
                }
            });
            if (e.hasClass(f.active)) {
                e.next(f.group).trigger("show", [true])
            } else {
                e.next(f.group).trigger("hide", [true])
            }
            d.find("#Transfer\\.ExpirationDateTime").datepicker({
                minDate: 0,
                onSelect: function (j, n) {
                    try {
                        var l = new Date(j);
                        var k = Math.ceil((l - (new Date())) / 86400000);
                        d.find("#expireDateDays").text(k.toFixed(0))
                    } catch (m) {}
                }
            }).end().find("#ExpireFiles").click(function () {
                try {
                    if (a(this).is(":checked")) {
                        d.find("#Transfer\\.ExpirationDateTime").removeAttr("disabled")
                    } else {
                        d.find("#Transfer\\.ExpirationDateTime").attr("disabled", "disabled")
                    }
                } catch (j) {}
            }).end().find("#PasswordProtect").click(function () {
                try {
                    if (a(this).is(":checked")) {
                        d.find("#Transfer\\.Password").removeAttr("disabled");
                        d.find("#Transfer\\.ConfirmPassword").removeAttr("disabled")
                    } else {
                        d.find("#Transfer\\.Password").attr("disabled", "disabled");
                        d.find("#Transfer\\.ConfirmPassword").attr("disabled", "disabled")
                    }
                } catch (j) {}
            });
            a("#ui-datepicker-div").css("z-index", "2")
        },
        _validateMaxFileSize: function (e) {
            var d = true;
            if (this.options.maxFileSize > 0) {
                e = e || this.$slickUploader.slickupload("stats").maxFileSize;
                if (e > this.options.maxFileSize) {
                    d = false;
                    this.$filesValidation.html(this.$filesValidation.data("msg-filesize")).slideDown()
                }
            }
            return d
        },
        _validateMaxTransferSize: function (e) {
            var d = true;
            if (this.options.maxTransferSize > 0) {
                e = e || this.$slickUploader.slickupload("stats").transferSize;
                if (e > this.options.maxTransferSize) {
                    d = false;
                    this.$filesValidation.html(this.$filesValidation.data("msg-transfersize")).slideDown()
                }
            }
            return d
        },
        _validateMaxFilesPerTransfer: function (e) {
            var d = true;
            if (this.options.maxFilesPerTransfer > 0) {
                e = e || this.$slickUploader.slickupload("stats").numFiles;
                if (e > this.options.maxFilesPerTransfer) {
                    d = false;
                    this.$filesValidation.html(this.$filesValidation.data("msg-maxfiles")).slideDown()
                }
            }
            return d
        },
        _validateMinFilesPerTransfer: function (e) {
            var d = true;
            e = e || this.$slickUploader.slickupload("stats").numFiles;
            if (e < 1) {
                d = false;
                this.$filesValidation.html(this.$filesValidation.data("msg-minfiles")).slideDown()
            }
            return d
        },
        _validateRemainingStorage: function (e) {
            var d = true;
            if (this.options.remainingStorage > 0) {
                e = e || this.$slickUploader.slickupload("stats").transferSize;
                if (e > this.options.remainingStorage) {
                    d = false;
                    this.$filesValidation.html(this.$filesValidation.data("msg-storagelimit")).slideDown()
                }
            }
            return d
        },
        _validateMaxRecipients: function (e) {
            var d = true;
            e = e || this.$recipientList.tagit("tags").length;
            if (this.options.maxRecipientsPerTransfer > 0 && e > this.options.maxRecipientsPerTransfer) {
                d = false;
                this.$recipientValidation.html(this.$recipientValidation.data("msg-maxrecipients")).slideDown()
            }
            return d
        },
        _validateMinRecipients: function () {
            var d = true;
            if (this.options.minRecipientsPerTransfer > 0 && this.$recipientList.tagit("tags").length < this.options.minRecipientsPerTransfer) {
                d = false;
                this.$recipientValidation.html(this.$recipientValidation.data("msg-minrecipients")).slideDown()
            }
            return d
        },
        _updateFileCount: function () {
            var f = this.$slickUploader.slickupload("stats");
            if (this._validateMaxFileSize(f.maxFileSize) && this._validateMaxTransferSize(f.transferSize) && this._validateMaxFilesPerTransfer(f.numFiles) && this._validateRemainingStorage(f.transferSize)) {
                this.$filesValidation.slideUp().html()
            }
            var e = "0KB";
            if (f.transferSize && f.transferSize != 0) {
                e = c.formatSize(f.transferSize)
            }
            var d = "0";
            if (f.numFiles && f.numFiles != 0) {
                d = f.numFiles
            }
            this.$fileSize.html(e);
            this.$fileCount.html(d)
        },
        _initializeUpload: function () {
            var g = this,
                d = this.element,
                f = this.options;
            if (!g._validateInitialize()) {
                return false
            }
            var j = g._prepareInitialize();
            var h = false;
            var e = a.ajax({
                url: "/upload/initialize",
                type: "POST",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(j)
            });
            e.success(function (k, m, l) {
                if (k && k.DownloadUrl) {
                    d.find("#download-page-btn").attr("href", k.DownloadUrl);
                    c.shareDownloadLink(k.DownloadUrl)
                }
                h = true
            });
            e.error(function (k, m, l) {
                c.displayAjaxError(k);
                h = false
            });
            if (h) {
                g._openProgressDialog()
            }
            return h
        },
        _prepareInitialize: function () {
            var g = this,
                d = this.element,
                f = this.options;
            var k = d.inputHash();
            var l = a.extend(true, g.$slickUploader.slickupload("info"), k || {});
            var j = g.$recipientList.tagit("tags");
            var h;
            for (var e = 0; e < j.length; e++) {
                h = j[e];
                if (h.category && h.id) {
                    if (h.category === "Contacts") {
                        l.Contacts.push(h.id)
                    } else {
                        l.ContactGroups.push(h.id)
                    }
                } else {
                    l.Recipients.push(new c.Model.TbfInitRecipient({
                        name: h.label,
                        email: h.value
                    }))
                }
            }
            return l
        },
        _validateInitialize: function () {
            var f = this,
                d = this.element,
                e = this.options;
            var g = f.$slickUploader.slickupload("stats");
            if (!f._validateMaxFileSize(g.maxFileSize) || !f._validateMaxTransferSize(g.transferSize) || !f._validateMaxFilesPerTransfer(g.numFiles) || !f._validateMinFilesPerTransfer(g.numFiles) || !f._validateRemainingStorage(g.transferSize)) {
                return false
            }
            f.$filesValidation.slideUp().html();
            if (!f._validateMaxRecipients() || !f._validateMinRecipients()) {
                return false
            }
            f.$recipientValidation.slideUp().html();
            return true
        },
        _openProgressDialog: function () {
            var f = this,
                d = this.element;
            var e = d.find("#progressDisplay");
            e.dialog({
                autoOpen: false,
                closeOnEscape: false,
                bgiframe: true,
                resizable: false,
                draggable: false,
                dialogClass: "ui-dialog-title-hidden",
                modal: true,
                position: "center",
                width: e.width() + 20
            });
            e.dialog("open")
        },
        _finalizeUpload: function (e) {
            var h = this,
                d = this.element,
                g = this.options;
            var j = h._prepareFinalize(e);
            var f = a.ajax({
                url: "/upload/finalize",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(j),
                success: function (k, m, l) {
                    h.$progressDisplay.removeClass("tbf-upload-inprogress").addClass("tbf-upload-complete").find(".upload-details").slideDown("slow");
                    h.$progressDisplay.find(".upload-details").slideDown()
                },
                error: function (k, m, l) {
                    h.$progressDisplay.removeClass("tbf-upload-inprogress").addClass("tbf-upload-error")
                }
            })
        },
        _prepareFinalize: function (e) {
            var g = this,
                d = this.element,
                f = this.options;
            var h = a.extend(true, new c.Model.TbfFinalizeUpload(), e || {});
            h.SendEmailAsMe = a("#SendEmailFromMe").is(":checked");
            return h
        },
        complete: function (d) {
            this._finalizeUpload(d)
        },
        destroy: function () {
            this.$recipientList.tagit("destroy");
            this.$slickUploader.slickuploader("destroy");
            this.$recipientList = null;
            this.$slickUploader = null;
            this.$recipientList = null;
            this.recipientSource = null;
            this.$filesPanel = null;
            this.$filesValidation = null;
            this.$recipientsPanel = null;
            this.$recipientValidation = null;
            this.$optionalSettingsPanel = null;
            a.Widget.prototype.destroy.apply(this, arguments)
        }
    });
    a.widget("tbf.dropboxuploader", {
        options: {
            maxFileSize: 0,
            maxTransferSize: 0,
            maxFilesPerTransfer: 0,
            maxRecipientsPerTransfer: 0,
            minRecipientsPerTransfer: 0,
            remainingStorage: 0
        },
        $slickUploader: null,
        $filesPanel: null,
        $filesValidation: null,
        $fileSize: null,
        $fileCount: null,
        $progressDisplay: null,
        _create: function () {
            this._bindUploader();
            c.watermark(this.element);
            c.styleButtons(this.element)
        },
        _bindUploader: function () {
            var f = this,
                d = this.element,
                e = this.options;
            this.$filesPanel = this.element.find("#filesPanel");
            this.$fileSize = d.find("#fileSize");
            this.$fileCount = d.find("#fileCount");
            this.$progressDisplay = d.find("#progressDisplay");
            this.$slickUploader = this.element.slickupload({
                maxFileSize: e.maxFileSize,
                maxFilesPerTransfer: e.maxFilesPerTransfer
            });
            d.bind("slickupload.filevalidated slickupload.fileremoved", function (g) {
                f._updateFileCount()
            }).bind("slickupload.reset slickupload.cancel", function () {
                window.location.href = window.location.href
            }).bind("slickupload.starting", function () {
                return f._initializeUpload()
            })
        },
        _updateFileCount: function () {
            var f = this.$slickUploader.slickupload("stats");
            var e = "0 KB";
            if (f.transferSize != 0) {
                e = c.formatSize(f.transferSize)
            }
            var d = "0";
            if (f.numFiles != 0) {
                d = f.numFiles
            }
            this.$fileSize.html(e);
            this.$fileCount.html(d)
        },
        _initializeUpload: function () {
            var g = this,
                d = this.element,
                f = this.options;
            var j = g._prepareInitialize();
            var h = false;
            var e = a.ajax({
                url: "/upload/initialize",
                type: "POST",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(j)
            });
            e.success(function (k, m, l) {
                h = true
            });
            e.error(function (k, m, l) {
                c.displayAjaxError(k);
                h = false
            });
            if (h) {
                g._openProgressDialog()
            }
            return h
        },
        _prepareInitialize: function () {
            var f = this,
                d = this.element,
                e = this.options;
            var g = d.inputHash();
            var h = a.extend(true, f.$slickUploader.slickupload("info"), g || {});
            return h
        },
        _openProgressDialog: function () {
            var f = this,
                d = this.element;
            var e = d.find("#progressDisplay");
            e.dialog({
                autoOpen: false,
                closeOnEscape: false,
                bgiframe: true,
                resizable: false,
                draggable: false,
                modal: true,
                position: "center",
                width: e.width() + 20
            });
            a(".ui-dialog-titlebar", e.parent()).hide();
            e.dialog("open")
        },
        _finalizeUpload: function (e) {
            var h = this,
                d = this.element,
                g = this.options;
            var j = h._prepareFinalize(e);
            var f = a.ajax({
                url: "/upload/finalize",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(j),
                success: function (k, m, l) {
                    h.$progressDisplay.removeClass("tbf-upload-inprogress").addClass("tbf-upload-complete").find(".upload-details").slideDown("slow");
                    h.$progressDisplay.find(".upload-details").slideDown()
                },
                error: function (k, m, l) {
                    h.$progressDisplay.removeClass("tbf-upload-inprogress").addClass("tbf-upload-error")
                }
            })
        },
        _prepareFinalize: function (e) {
            var g = this,
                d = this.element,
                f = this.options;
            var h = d.inputHash();
            var j = a.extend(true, new c.Model.TbfFinalizeUpload(), h || {}, e || {});
            return j
        },
        complete: function (d) {
            this._finalizeUpload(d)
        },
        destroy: function () {
            this.$slickUploader.slickuploader("destroy");
            this.$slickUploader = null;
            a.Widget.prototype.destroy.apply(this, arguments)
        }
    })
}(this.TBF = this.TBF || {}, jQuery));


