const ratePost = (postId, rating) => {
    $.ajax({
        type: "POST",
        url: "/feed/posts/" + rating + "/" + postId,
        data: {},
        success: function(post) {
            const likes = post.likes ? ' ' + post.likes : '';
            const dislikes = post.dislikes ? ' ' + post.dislikes : '';
            $('#likes-count-' + postId).text(likes);
            $('#dislikes-count-' + postId).text(dislikes);

        },
        error: function () {
            alert("ERROR");
        }
    });
};
const toggleNewEntityForm = (selector) => {
    $(selector).toggle();
};