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
})();
