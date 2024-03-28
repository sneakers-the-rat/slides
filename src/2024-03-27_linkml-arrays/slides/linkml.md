# LinkML

What is linkml anyway?

```{admonition} TODO
finish this
```

```{mermaid}
stateDiagram-v2
    classDef dotted stroke-dasharray:5,5,font-size:0.75em


    [*] --> Metamodel
    Metamodel --> Loaders
    Loaders --> Generators
    Schema --> Loaders

    state imports <<join>>
    scha: Schema A
    schb: Schema B
    scha --> imports
    schb --> imports
    imports --> Schema
    Generators --> Pythongen
    Pythongen --> Metamodel: Self-defining

    class scha dotted
    class schb dotted
```