$$(function() {
    let btn = $$('.tabs>[data-type="tabs-btn"]>li');
  
    btn.on('click', function() {
       
       
      
        $$(this).addClass('active').siblings().removeClass('active');
        let index = btn.index(this);
        
        $$('.tabs>[data-type="tabs-div1"]').eq(index).addClass('show').siblings().removeClass('show');
    });
});

