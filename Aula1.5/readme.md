# FocusEvent

Estes são os principais eventos da KeyboardEvent:

1. focusin: quando um elemento está prestes a receber foco. Tem bubbling, principal diferença em relação ao focus.
2. focusout: quando um elemento está prestes a perder o foco. Tem bubbling, principal diferença em relação ao blur.
3. blur: acontece quando o elemento perde o foco.
4. focus

Ordem dos eventos:

- focusin > focus
- focusout > focusin > blur > focus

Propriedades adicionais da MouseEvent:

1. relatedTarget: elemento relacionado, como no focusout que é o elemento que perdeu o foco. No focusin, é o elemento que ganhou foco.
