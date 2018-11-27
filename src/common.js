
function getnotice(str, time, classStr) {
  var time = time || 2000
  var str = str || '提示信息'
  if ($('body').find('#notice_model')) {
    $('body').find('#notice_model').remove()
  }
  $('body').append('<div id="notice_model"></div>')
  classStr ? $('body #notice_model').addClass(classStr) : '';
  $('body #notice_model').html(str)
  setTimeout(function () {
    $('body #notice_model').addClass('feadout');
  }, time)
}


// 解决嵌入APP后顶部title的变化
const titleUtil = {};

titleUtil.setTitle = (title) => {
    document.title = title;
    let ua = navigator.userAgent;
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = () => {
            setTimeout(() => {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
};

export {
   getnotice,
   titleUtil
}

