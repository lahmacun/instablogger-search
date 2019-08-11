$(function() {
    let base_url = "https://zahidefe.net";

    $.ajax({
        type: "GET",
        url: base_url + "/wp-json/wp/v2/posts?page=1&per_page=10&_embed",
        success: function(response) {
            $('.posts').html("");
            response.forEach(function(post) {
                var post_image = post._embedded['wp:featuredmedia'] ? '<div class="card-image"><img src="' + post._embedded['wp:featuredmedia']['0'].source_url + '" alt="" style="height: 100%;"></div>' : '';
                $(".posts").append('<div class="col s12 m6">\n' +
                    '\t\t\t    <div class="card darken-1">\n' +
                    post_image +
                    '\t\t\t\t    <div class="card-content white-text">\n' +
                    '\t\t\t\t\t    <span class="card-title">' + post.title.rendered + '</span>\n' +
                    '\t\t\t\t\t    <p>' + post.excerpt.rendered + '</p>\n' +
                    '\t\t\t\t    </div>\n' +
                    '\t\t\t\t    <div class="card-action">\n' +
                    '\t\t\t\t\t    <a href="' + post.link + '">Yazıyı Oku</a>\n' +
                    '\t\t\t\t    </div>\n' +
                    '\t\t\t    </div>\n' +
                    '\t\t    </div>');
            })
        }
    });

    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        var search_term = $('.search').val();
        if ($.trim(search_term) == '') {
            var search_url = base_url + "/wp-json/wp/v2/posts?page=1&per_page=10&_embed";
        } else {
            var search_url = base_url + "/wp-json/wp/v2/posts?meta_key=lahmacun_post_code&meta_value=" + search_term + "&_embed";
        }
        $('.posts').html('<img src="assets/img/loading.svg" />');
        $.ajax({
            type: "GET",
            url: search_url,
            success: function(response) {
                $('.posts').html("");
                response.forEach(function(post) {
                    var post_image = post._embedded['wp:featuredmedia'] ? '<div class="card-image"><img src="' + post._embedded['wp:featuredmedia']['0'].source_url + '" alt="" style="height: 100%;"></div>' : '';
                    $(".posts").append('<div class="col s12 m6">\n' +
                        '\t\t\t    <div class="card darken-1">\n' +
                        post_image +
                        '\t\t\t\t    <div class="card-content white-text">\n' +
                        '\t\t\t\t\t    <span class="card-title">' + post.title.rendered + '</span>\n' +
                        '\t\t\t\t\t    <p>' + post.excerpt.rendered + '</p>\n' +
                        '\t\t\t\t    </div>\n' +
                        '\t\t\t\t    <div class="card-action">\n' +
                        '\t\t\t\t\t    <a href="https://zahidefe.net/?p=' + post.link + '">Yazıyı Oku</a>\n' +
                        '\t\t\t\t    </div>\n' +
                        '\t\t\t    </div>\n' +
                        '\t\t    </div>');
                })
            }
        });
    });
})
