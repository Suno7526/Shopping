var xhr = new XMLHttpRequest();
var url = 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'ZSfaM%2FLZuHLIyZjsPt9c4Oe2N0ASRCvSPSVKyMv3zGb2WoJHQzFUWGtQb9cVBB3YqcZUTkg8Mi482pO24BYX%2Fw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('LAWD_CD') + '=' + encodeURIComponent('11110'); /**/
queryParams += '&' + encodeURIComponent('DEAL_YMD') + '=' + encodeURIComponent('201512'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');