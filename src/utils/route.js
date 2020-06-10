// import html2canvas from 'html2canvas';
import request from './request';

export function getRoute() {
    request.post("/admin/access/menu").then(res => { 
        // console.log(res)
        if (res.code == 200) {
            var menuList = res.data.list;
            var router = JSON.parse(sessionStorage.getItem('route'));
            // console.log(router)
            localStorage.setItem('user_id',res.data.user.id)
              

            router.forEach(element => {
                  element.hidden = !menuList.includes(element.path)
                  if(element.children){
                      element.children.forEach(element1 => {
                          element1.hidden = !menuList.includes(element1.path)
                      });
                  }
              });
              
            //   console.log(router)
              var list = router;
              sessionStorage.setItem('route1',JSON.stringify(list))
              
            //   console.log(this.$router.options.routes)
              // this.$router.options.routes[2].path = '2124'
              
            //   localStorage.setItem("pathList",this.$router.options.routes)
        }
    });
}