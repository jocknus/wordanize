window.Grouper = (function () {


    var CLASS_COUNTER = "counter";
    var CLASS_EXPANDED = "expanded";
    var CLASS_EXPAND = "expand";
    var CLASS_EDITABLE = "editable";
    var CLASS_EDIT = "edit";
    var CLASS_RESET = "reset";
    var CLASS_REMOVE = "split";


    var GROUP_HTML = '<div class="group expanded"><p class="editable">Hattar</p>' +
        '<div class="expand"><span class="counter">1</span></div><div class="edit">' +
        '<textarea class="field single-line" type="text">Hattar</textarea></div></div>';


    var handleWrapping = function (elTarget) {

        if (shouldCreateNewWrapper(elTarget)) {
            var wrapper = $(GROUP_HTML);
            var oldWrapper = elTarget.parent();

            updateName(wrapper, elTarget.find("p").text());
            updateInputField(wrapper, elTarget.find("p").text());

            setRemoveLogic(elTarget);

            wrapper.append(elTarget);
            $("#dropzone").append(wrapper);


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

                    if ($(this).val() == "hasselhoff") {
                        wrapper.toggleClass("hasselhoff");
                    }
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
        var removeEl = el.find("." + CLASS_REMOVE);
        removeEl.unbind("click");
        removeEl.toggleClass(CLASS_REMOVE);
        removeEl.toggleClass(CLASS_RESET)
        removeEl.click(function () {
            var resetEl = el.find("." + CLASS_RESET);
            resetEl.unbind("click");
            resetEl.toggleClass(CLASS_REMOVE)
            resetEl.toggleClass(CLASS_RESET);
            $(el).find("." + CLASS_REMOVE).click(function () {
                Splitter.createSplitter($(el));

            });
            var oldWrapper = el.parent();
            $("#dragzone").append(el);
            updateCounter(oldWrapper);
            shouldMaybeRemoveWrapper(oldWrapper)
        });

    };


    var handleGrouping = function (elTargetWrapper, elTarget) {
        var oldWrapper = elTarget.parent();
        elTargetWrapper.append(elTarget);
        updateCounter(elTargetWrapper);
        updateCounter(oldWrapper);

        shouldMaybeRemoveWrapper(oldWrapper)
    };

    var updateInputField = function (wrapper, text) {
        wrapper.find("textarea").text(text);
    };

    var updateCounter = function (wrapper) {
        wrapper.find("." + CLASS_COUNTER).text(wrapper.find($(".word")).length);
    };

    var updateName = function (wrapper, text) {
        wrapper.find("." + CLASS_EDITABLE).text(text);
    };

    var shouldMaybeRemoveWrapper = function (oldWrapper) {
        if (!oldWrapper.is($("#dragzone"))) {
            if (oldWrapper.find($(".word")).length == 0) {
                oldWrapper.remove();
            }
        }

    };

    var shouldCreateNewWrapper = function (elTarget) {
        if (elTarget.parent().is($("#dragzone"))) {
            return true;
        }

        if (elTarget.parent().children().length >= 2) {
            return true;
        }

        return false;
    };

    return {
        createGroup: function (el) {
            handleWrapping(el);
        }
    };

})();





