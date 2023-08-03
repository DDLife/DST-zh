there is a folder whose struct is like below:

```txt
- TITLE
  - A
  - B
  - SUB-TITLE
    - C
    - D
```

then I want to iterate all in the folder, and generate DOM elements, like below:

```html
<ul class="collapse">
  <li>
    TITLE
    <ul>
      <li>A</li>
      <li>B</li>
      <li>
        SUB-TITLE
        <ul>
          <li>C</li>
          <li>D</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

replace the content of ul whose class name is `collapse` with the generated html instead of `data.replace("${nodeTree}", html)`

is there anything wrong with my code?

```html
<ul class="collapse"><li>docs<ul><li>behaviours<li>behaviours<ul><li>doaction.md</li></ul></li></li><li>README.md</li><li>SUMMARY.md</li><li>actions.md</li><li>behaviourtree.md</li><li>brain.md</li><li>bufferedaction.md</li><li>class.md</li><li>recipe.md</li><li>util.md</li></ul></li></ul>
```
