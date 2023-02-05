export function isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        console.log("mobile device");
        return true;
      }else{
        // false for not mobile device
        console.log("not mobile device");
        return false;
      }
}