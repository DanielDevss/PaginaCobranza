document.querySelector('.login div div .verOcultar').addEventListener('click', e => {
    const passwordInput = document.querySelector('#password');
    if (e.target.classList.contains('show')){
        e.target.classList.remove('show');
        e.target.textContent = '\uF33F';
        passwordInput.type = 'text';
    }
    else{
        e.target.classList.add('show');
        e.target.textContent = '\uF33E';
        passwordInput.type = 'password'
    }
})

(function($) {
    $.copy = function(t) {
        var ruta = "swf/copy.swf"
        if (typeof t == 'undefined')
        {
            t = '';
        }
        var i = '<embed src="' + ruta + '" FlashVars="clipboard=' ;
         	i += encodeURIComponent(t) ;
            i += '" width="0" height="0" ';
            i += 'type="application/x-shockwave-flash"></embed>';
        if ($('#flashcopier').length == 0)
        {
            $('body').append('<div id="flashcopier">' + i + '</div>')
        }
        else
        {
            $('#flashcopier').html(i)
        }
    }
})(jQuery);
