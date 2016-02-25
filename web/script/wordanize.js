$(function () {

    var DROP_ZONE = $("#dropzone");
    var WORDS = $(".word");


    DROP_ZONE.droppable({
        drop: function (event, ui) {
            window.Grouper.createGroup(ui.draggable);
        }
    });

    createDraggables(WORDS);
});

var createDraggables = function (elements) {
    var CLASS_PLACE_HOLDER = "placeholder";
    var CLASS_SPLIT = "split";
    elements.draggable({
        start: function (event, ui) {
            $(this).addClass(CLASS_PLACE_HOLDER);
        },
        drag: function (event, ui) {
        },
        stop: function (event, ui) {
            $(this).removeClass(CLASS_PLACE_HOLDER);
        },
        appendTo: "body",
        revert: "invalid",
        helper: "clone",
        cursor: "move"
    });

    $.each(elements, function (index, el) {
        $(el).find("." + CLASS_SPLIT).click(function () {
            Splitter.createSplitter($(el));

        });
    });
}


