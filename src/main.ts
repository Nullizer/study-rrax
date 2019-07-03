import { of, from, fromEvent, empty, never, interval, timer } from 'rxjs'
import { map, mapTo, filter, take, takeUntil, concatAll, zip } from "rxjs/operators"

const source1 = from(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello RxJS!')
  }, 3000)
}))
source1.subscribe(console.log)

// const source2 = fromEvent(document.body, 'click')
// source2.subscribe(console.log)

const source3 = empty()
source3.subscribe(console.log, null, () => console.log('complete!'))

const source_never = never()
source_never.subscribe(console.log, console.error, () => console.log('never complete!!'))

// const source4 = interval(1000)
// const sub4 = source4.subscribe(x => {
//   console.log(x)
//   if (x >= 10) sub4.unsubscribe()
// })

const handler = [
  console.log,
  console.error,
  () => console.log('handle complete!'),
]

const source4 = interval(1000).pipe(take(3))
source4.subscribe(...handler)

const stop_source = fromEvent(document.querySelector('#stop_btn'), 'click')
timer(1000, 25).pipe(takeUntil(stop_source)).subscribe(
  n => document.querySelector('#num').innerHTML = String(n)
)

fromEvent(document.body, 'click')
  .pipe(map(e => of(1, 2, 3)), concatAll())
  .subscribe(...handler);

const dragDOM = document.getElementById('drag');
const body = document.body;

const mouseDown = fromEvent(dragDOM, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');

mouseDown.pipe(
  map(event => mouseMove.pipe(takeUntil(mouseUp))),
  concatAll(),
  map(e => ({ x: (e as any).clientX, y: (e as any).clientY }))
).subscribe(pos => {
  dragDOM.style.left = pos.x + 'px';
  dragDOM.style.top = pos.y + 'px';
})

const p = `
很久很久很久以前的远古时期,各大浏览器还都是不统一标准的。直到最早的 sizzle 标准化，
以及更多的类似于sizzle 的标准化，才有了开发者如今的高效编程，而在现在三大mvvm论道
争锋的时代，是否会有其一也成为浏览器标准呢？当然，这是我个人的猜想。而一旦猜想成立。
谷歌产品Angular势必成为chrome标准了吧？`
interval(25)
  .pipe(zip(from(p), (_, c) => c))
  .subscribe(char => document.querySelector('#prag').innerHTML += char)

console.log('end')
