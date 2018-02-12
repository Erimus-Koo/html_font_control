// console log ══════════════════════════════
log = function() {
    console.log(arguments)
    $('#info').html(JSON.stringify(arguments))
    $('#debug').addClass('show')
}
// setting panel ══════════════════════════════
// open press '设置'
$('#settingBtn').click(function() {
    $('#setting').toggleClass('on')
})
// close
$('#setting #close').click(function() {
    $('#setting').removeClass('on')
})

// font size ══════════
sizeChange = function(change) {
    var size = parseInt(localStorage.font_size)
    var olds = size
    if (change == '+') {
        size = Math.min(size + 1, 32)
    } else if (change == '-') {
        size = Math.max(size - 1, 12)
    }
    localStorage.font_size = size
    $('body').css('font-size', size)
    $('#setting #size').text(size + 'px')
}

// font size - reduce
$('#setting #small').click(function() {
    sizeChange('-')
})
// font size - enlarge
$('#setting #big').click(function() {
    sizeChange('+')
})

// font weight ══════════
weightChange = function(change) {
    var weight = parseInt(localStorage.font_weight)
    // alert(weight)
    if (change == '+') {
        weight = Math.min(weight + 100, 900)
    } else if (change == '-') {
        weight = Math.max(weight - 100, 100)
    }
    localStorage.font_weight = weight
    $('body').css('font-weight', weight)
    $('#setting #weight').text(weight)
}
// font weight - lighter
$('#setting #light').click(function() {
    weightChange('-')
})
// font weight - bolder
$('#setting #bold').click(function() {
    weightChange('+')
})

// color style ══════════
$('#setting #color b').click(function() {
    cls = $(this).attr('class')
    localStorage.color_plan = cls
    $('body').attr('class', cls)
    $('#debug').attr('class', cls)
})

// font family ══════════
$('#setting #family b').click(function() {
    family = $(this).css('font-family')
    localStorage.font_family = family
    $('body').css('font-family', family)
})


// 初始化 从localStorage获取设置 ══════════════════════════════
// setting ══════════
if (!localStorage.font_size) {
    localStorage.font_size = 16 //默认值
}
sizeChange('')

if (!localStorage.font_weight) {
    localStorage.font_weight = 400 //默认值
}
weightChange('')

if (!localStorage.font_family) {
    localStorage.font_family = 'paper'
}
$('body').css('font-family', localStorage.font_family)

if (!localStorage.color_plan) {
    localStorage.color_plan = 'sans-serif'
}
$('body').attr('class', localStorage.color_plan)
$('#debug').attr('class', localStorage.color_plan)

// 词的翻译 ══════════════════════════════
// 格式化注释。
$("#zhushi b").each(function() {
    // var index = $(this).attr('id').replace('wt_', '')
    // var title = $('#wr_' + index).parent('span').text()
    // $(this).attr('title', title)
    // var info = $('#wr_' + index).parent('span').text()
    // var id = 'wr_' + index + '"'
    // info = info.replace(id, id + ' style="color:#D44"')
    // $(this).attr('info', info)
    $(this).after('：')
})
// 格式化原文中有注释的词。
$("#yuanwen u").each(function() {
    var index = $(this).attr('id').replace('wr_', '')
    var title = $('#wt_' + index).parent('p').text()
    $(this).attr('title', title)
    var info = $('#wt_' + index).parent('p').html()
    $(this).attr('info', info)
    // $(this).after('<sup>' + index + '</sup>')
})
// 整句翻译 ══════════════════════════════
// 原文
$("#yuanwen span").each(function() {
    var index = $(this).attr('id').replace('sr_', '')
    var title = $('#st_' + index).text()
    $(this).attr('title', title)
    $(this).attr('info', title)
})
// 译文
// $("#yiwen span").each(function() {
//     var index = $(this).attr('id').replace('st_', '')
//     var title = $('#sr_' + index).text()
//     $(this).attr('title', title)
//     $(this).attr('info', title)
// })

// 註解框 ══════════════════════════════
$('section *').click(function(e) {
    e.stopPropagation()
    status = $(this).attr('class')
    $('section *').removeClass('selected')
    info = $(this).attr('info')
    console.log(info,status)
    // 点击物已经展开 || 点击物没有title
    if (status == 'selected' || !info) {
        $('#debug').removeClass('show')
    } else {
        $(this).addClass('selected')
        $('#info').html(info)
        $('#debug').addClass('show')
    }
})

// 点击提示框 / 关闭
$('#debug').click(function() {
    $(this).removeClass('show')
    $('#info').html('')
    $('section *').removeClass('selected')
})
