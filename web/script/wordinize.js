$(function () {

    var DRAG_ZONE = $("#dragzone");
    var DROP_ZONE = $("#dropzone");

    var CLASS_PLACE_HOLDER = "placeholder";
    var CLASS_COUNTER = "counter";
    var CLASS_EXPANDED = "expanded";
    var CLASS_EXPAND = "expand";
    var CLASS_EDITABLE = "editable";
    var CLASS_EDIT = "edit";
    var CLASS_RESET = "reset";
    var CLASS_REMOVE = "remove";

    var WORDS = $(".word");

    var GROUP_HTML = '<div class="group expanded"><p class="editable">Hattar</p>' +
        '<div class="expand"><span class="counter">1</span></div><div class="edit">' +
        '<textarea class="field single-line" type="text">Hattar</textarea></div></div>';


    WORDS.draggable({
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

    DROP_ZONE.droppable({
        drop: function (event, ui) {

            handleWrapping(ui.draggable);
        }
    });


    var handleWrapping = function (elTarget) {

        if (shouldCreateNewWrapper(elTarget)) {
            var wrapper = $(GROUP_HTML);
            var oldWrapper = elTarget.parent();

            updateName(wrapper, elTarget.find("p").text());
            updateInputField(wrapper, elTarget.find("p").text());

            setRemoveLogic(elTarget);

            wrapper.append(elTarget);
            DROP_ZONE.append(wrapper);


            wrapper.find("." + CLASS_EXPAND).click(function () {
                wrapper.toggleClass(CLASS_EXPANDED);
            });

            wrapper.find("." + CLASS_EDITABLE).click(function () {
                wrapper.find("." + CLASS_EDIT).show();
                wrapper.find("." + CLASS_EDIT).find("textarea").select();
                $(this).hide();

            });

            wrapper.find("textarea").keypress(function (e) {
                if (e.which == 13) {
                    wrapper.find("." + CLASS_EDITABLE).show();
                    wrapper.find("." + CLASS_EDIT).hide();
                    updateName(wrapper, $(this).val());
                    return false;
                }
            });

            wrapper.droppable({
                greedy: true,
                drop: function (event, ui) {
                    handleGrouping($(this), ui.draggable);
                    setRemoveLogic(ui.draggable);
                }
            });
            updateCounter(oldWrapper);
            shouldMaybeRemoveWrapper(oldWrapper)

        }
    };


    var setRemoveLogic = function (el) {
        el.find("." + CLASS_REMOVE).toggleClass(CLASS_REMOVE).toggleClass(CLASS_RESET).click(function () {
            /*            el.find("." + CLASS_RESET).toggleClass(CLASS_REMOVE).toggleClass(CLASS_RESET).click(function () {
             alert("Removing");
             el.remove();
             });*/
            var oldWrapper = el.parent();
            DRAG_ZONE.append(el);
            updateCounter(oldWrapper);
            shouldMaybeRemoveWrapper(oldWrapper)
        });

    };


    var handleGrouping = function (elTargetWrapper, elTarget) {
        var oldWrapper = elTarget.parent();
        elTargetWrapper.append(elTarget);
        updateCounter(elTargetWrapper);

        shouldMaybeRemoveWrapper(oldWrapper)
    };

    var updateInputField = function (wrapper, text) {
        wrapper.find("textarea").text(text);
    };

    var updateCounter = function (wrapper) {
        wrapper.find("." + CLASS_COUNTER).text(wrapper.find(WORDS).length);
    };

    var updateName = function (wrapper, text) {
        wrapper.find("." + CLASS_EDITABLE).text(text);
    };

    var shouldMaybeRemoveWrapper = function (oldWrapper) {
        if (!oldWrapper.is(DRAG_ZONE)) {
            if (oldWrapper.find(WORDS).length == 0) {
                oldWrapper.remove();
            }
        }

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


