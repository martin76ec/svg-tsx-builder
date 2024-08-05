```bash
███████╗██╗   ██╗ ██████╗     ████████╗███████╗██╗  ██╗    ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ 
██╔════╝██║   ██║██╔════╝     ╚══██╔══╝██╔════╝╚██╗██╔╝    ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗
███████╗██║   ██║██║  ███╗       ██║   ███████╗ ╚███╔╝     ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝
╚════██║╚██╗ ██╔╝██║   ██║       ██║   ╚════██║ ██╔██╗     ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗
███████║ ╚████╔╝ ╚██████╔╝       ██║   ███████║██╔╝ ██╗    ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║
╚══════╝  ╚═══╝   ╚═════╝        ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

# svg-builder

A "blazingly fast!" svg to tsx builder, it recieves a folder with svg files and transform them to tsx components. It includes an Icon component and a type with the name of all the icons generated.

The input folder should have all svg files in pascal case (e.g. `discord-icon-whatever.svg`)

Example of use (cli):

`svg-tsx-builder --inputDir /a/path --outputDir /another/path`

Example of use (generated component):

```tsx
function Bar() {
    return(
        <Icon name="your-icon-name" />
    );
}
```
