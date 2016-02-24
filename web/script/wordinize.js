$(function () {

    var DRAG_ZONE = $("#dragzone");
    var DROP_ZONE = $("#dropzone");


    $(".draggable").draggable({
        start: function (event, ui) {
        },
        drag: function (event, ui) {
        },
        stop: function (event, ui) {
        }
    });


    DROP_ZONE.droppable({
        drop: function (event, ui) {
            handleWrapping(ui.draggable);
        }
    });


    DRAG_ZONE.droppable({
        drop: function (event, ui) {
            var wrapper = ui.draggable.parent();
            $(this).append(ui.draggable);
            if (shouldRemoveWrapper(wrapper)) {
                wrapper.remove();
            }
        }
    });

    var handleWrapping = function (elTarget) {

        if (shouldCreateNewWrapper(elTarget)) {
            var wrapper = $("<div style=\"background-color:#29f; width: 50px; height: 50px; border-style: solid\"></div>");
            wrapper.append(elTarget);
            DROP_ZONE.append(wrapper);

            wrapper.droppable({
                greedy: true,
                drop: function (event, ui) {
                    handleGrouping($(this), ui.draggable);

                }
            });
        }
    };

    var handleGrouping = function (elTargetWrapper, elTarget) {
        var oldWrapper = elTarget.parent();
        elTargetWrapper.append(elTarget);

        if (shouldRemoveWrapper(oldWrapper)) {

            oldWrapper.remove();
        }
    };

    var shouldRemoveWrapper = function (oldWrapper) {
        if (!oldWrapper.is(DRAG_ZONE)) {
            if (oldWrapper.children().length == 0) {
                return true;
            }
        }

        return false;
    };

    var shouldCreateNewWrapper = function (elTarget) {
        if (elTarget.parent().is(DRAG_ZONE)) {
            return true;
        }

        if (elTarget.parent().children().length >= 2) {
            return true;
        }

        return false;
    };

});


