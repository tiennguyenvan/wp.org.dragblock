import './style.scss';
import './editor.scss';
var dragBlockFormElFocused = 0;
var dragBlockFormElInputted = 0;
document.addEventListener('DOMContentLoaded', function () {
    let inputs = document.querySelectorAll('input,select,textarea');
    inputs.forEach(function (el) {
        el.addEventListener('input', function(){            
            dragBlockFormElInputted = Date.now();            
        });
        el.addEventListener('focus', function(){
            if (dragBlockFormElFocused) return;
            dragBlockFormElFocused = Date.now();            
        });
    });
    let DragBlockLastReset = document.querySelectorAll('input[type="submit"], input[type="button"], button');
    if (!DragBlockLastReset) {
        return;
    }
    DragBlockLastReset.forEach(function (submitButton) {
        submitButton.addEventListener('mousedown', function () {
            let DragBlockLastFonts = document.querySelectorAll('input[name="dragblock/form-title"]');
            if (!DragBlockLastFonts || DragBlockLastFonts.length === 0) {
                return false;
            }
            if (!dragBlockFormElFocused || 
                !dragBlockFormElInputted ||
                500 > (dragBlockFormElInputted - dragBlockFormElFocused)
            ) {
                return false;
            }
            var nonceInput = document.createElement('input');
            nonceInput.setAttribute('type', 'hidden');
            nonceInput.setAttribute('name', 'dragblock/form-nonce-field');
            nonceInput.setAttribute('value', DRAG_BLOCK_FORM_NONCE_ACTION);
            submitButton.parentNode.insertBefore(nonceInput, submitButton);
            var tokenInput = document.createElement('input');
            tokenInput.setAttribute('type', 'hidden');
            tokenInput.setAttribute('name', 'dragblock/form-session-token');
            tokenInput.setAttribute('value', DRAG_BLOCK_FORM_SESSION_TOKEN);
            submitButton.parentNode.insertBefore(tokenInput, submitButton);
        });
    });
});