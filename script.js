function txtSf(item) {
    var theLetters = "가나다라마바사아자차카타파하#%&^+=-"
    var ctnt = $(item).data("txt")
    var speed = 40
    var increment = 2
    var clen = ctnt.length
    var si = 0
    var stri = 0
    var block = ""
    var fixed = ""
    
    ;(function rustle(i) {
        setTimeout(function () {
            if (--i) { rustle(i) }
            nextFrame(i)
            si = si + 1
        }, speed)
        $(item).addClass('end')
    })(clen * increment + 1)
    
    function nextFrame() {
        for (var i = 0; i < clen - stri; i++) {
            var num = Math.floor(theLetters.length * Math.random())
            var letter = theLetters.charAt(num)
            block = block + letter
        }
        if (si == (increment - 1)) {
            stri++
        }
        if (si == increment) {
            fixed = fixed + ctnt.charAt(stri - 1)
            si = 0
        }
        
        $(item).html(fixed + block)
        block = ""
    }
}

function numSf(item) {
    $({ Counter: '' }).animate({ Counter: $(item).data('num') }, {
        duration: 1000,
        step: function () {
            $(item).text(Math.ceil(this.Counter));
            $(item).addClass('end')
        }
    })
}

function animateInView() {
    var scrolledAmount = $(window).scrollTop(),
        bottomOfWindow = scrolledAmount + $(window).height()

    $(".shuffle").each(function (i,e) {
        var boxTop = $(this).offset().top;
        var data = $(e).data()
        if(!$(e).hasClass('end') && boxTop <= bottomOfWindow) {
            if(data.hasOwnProperty('txt')){
                txtSf(e)
            }else if(data.hasOwnProperty('num')){
                numSf(e)
            }
        }
    })
}

$(document).ready(function () {
    animateInView()
})

$(window).scroll(function () {
    animateInView()
})