import html2canvas from 'html2canvas';
import request from './request';

export function getImage() {
    // console.log(localStorage.getItem('imgId'))
    html2canvas(document.getElementById("allmap"), {
        useCORS: true,
        allowTaint: false,
        width: 1000,
        height: 600,
    }).then(function (canvas) {
        console.log(canvas.toDataURL("image/jpg"));
        request.post("/admin/index/image", {
            id : localStorage.getItem('imgId'),
            image_type:localStorage.getItem('big'),
            image_data:canvas.toDataURL("image/jpg")
        }).then(res => {
            
            // res.errno === 0 && this.getList();
        })
        // var img = canvas.toDataURL("image/png")
        // console.log(img);
    });
}