/* Text fades in and rises a little as it scrolls into view, on phones and laptops (6 Oct 2026, Vishal).
   Only text that starts BELOW the first screen is touched, so nothing a visitor sees on arrival is hidden
   and the page's speed score is unaffected. Off for anyone whose device asks for reduced motion. */
(function(){
 if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var sel='main h2,main h3,main p,main dl,main .eyebrow,main .lbl,main .t,main .disc,main .btn,main .figures li,main .steps li';
 var all=[].slice.call(document.querySelectorAll(sel)), set=new Set(all), vh=window.innerHeight;
 var els=all.filter(function(e){
  if(e.closest('.hero,.vh,header,footer,.spaces,.strip,.strip-rail'))return false;   // side-swipe photo rails keep their captions
  for(var a=e.parentElement;a;a=a.parentElement){if(set.has(a))return false;}   // animate the outer block once, not its parts twice
  return e.getBoundingClientRect().top>vh;
 });
 els.forEach(function(e){e.classList.add('rv');});
 var io=new IntersectionObserver(function(entries){
  var n=0;
  entries.forEach(function(en){
   if(!en.isIntersecting)return;
   var e=en.target; e.style.transitionDelay=Math.min(n++,4)*90+'ms'; e.classList.add('in'); io.unobserve(e);
  });
 },{rootMargin:'0px 0px -6% 0px',threshold:0.1});
 els.forEach(function(e){io.observe(e);});

 /* Photos fade in too, without the rise, as aman.com does (6 Oct 2026, Vishal: "the photos should also fade-in").
    A photo still loading waits for its pixels; any sliver in view counts, so a card peeking in from a photo rail is never blank. */
 var imgs=[].slice.call(document.querySelectorAll('main img')).filter(function(im){
  return !im.closest('.hero') && im.getBoundingClientRect().top>vh;
 });
 imgs.forEach(function(im){im.classList.add('rvi');});
 function show(im){im.classList.add('in');}
 var io2=new IntersectionObserver(function(entries){
  entries.forEach(function(en){
   if(!en.isIntersecting)return;
   var im=en.target; io2.unobserve(im);
   if(im.complete&&im.naturalWidth)show(im);
   else{im.addEventListener('load',function(){show(im);},{once:true});im.addEventListener('error',function(){show(im);},{once:true});}
  });
 },{rootMargin:'0px 0px -4% 0px',threshold:0});
 imgs.forEach(function(im){io2.observe(im);});
})();
