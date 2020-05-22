import html2canvas from 'html2canvas'

function getImage() {
    html2canvas(document.getElementById("allmap"), {
        useCORS: true,
        allowTaint: false,
        width: 1000,
        height: 400,
    }).then(function (canvas) {
        console.log(canvas.toDataURL("image/png"));
        // var img = canvas.toDataURL("image/png")
        // console.log(img);
    });
}