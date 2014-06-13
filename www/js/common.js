/**
 * Created by Leo on 5/31/2014.
 */
var consultaMinisterio = function (numeroMinisterio) {
	var restWebServiceUrl = "https://sisa.msal.gov.ar/sisa/services/rest/ministerio/{código}";

	$.ui.loadAjax(restWebServiceUrl.replace("{código}", numeroMinisterio.value),
		false, false, "slide", true);
};

// Create the XHR object.
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// CORS not supported.
		xhr = null;
	}
	return xhr;
}
