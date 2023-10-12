import './editor.scss';
function DragBlockLast() {
    $(document).on('click change', 'select[id*=inspector-select-control]', function(){
        if (!$(this).find('option[value="Arial, Helvetica, sans-serif"]').length) return;
        $(this).find('option').each(function(){
            $(this).css('font-family', $(this).attr('value'));            
        });
        $(this).css('font-family', $(this).val()).css('font-size', '20px');;
    });
}
jQuery(function(){
    $ = jQuery;
    DragBlockLast();    
});