interface Viz{
    first: string,
    second: string
}

export const insertionSort = (jsxArray: JSX.Element[], tab: number) => {
    let visualization: Viz[] = [];

    for (let i=0;i<jsxArray.length;i++){
        let j = i;
        while (j > 0 && jsxArray[j-1].props.children > jsxArray[j].props.children){
            visualization.push({
                first: jsxArray[j].props.id,
                second: jsxArray[j-1].props.id
            });
            let temp = jsxArray[j];
            jsxArray[j] = <div className="sortColumn" id={jsxArray[j].props.id}>{jsxArray[j-1].props.children}</div>;
            jsxArray[j-1] = <div className="sortColumn" id={jsxArray[j-1].props.id}>{temp.props.children}</div>;
            j -= 1;
        }
    }
    play(visualization, tab);
}

export const height = (num: number, array: number[]) => {
    return (930 / Math.max(...array) - 2) * num + 5;
}

export const play = (visualization: Viz[], tab: number)=>{
    let i = 0;
    document.getElementById('root')!.style.pointerEvents = 'none';
    
    visualization.forEach((elem)=>{
        i += 1;
        setTimeout(()=>{
            let temp = document.getElementById(elem.first)!.style.height;
            document.getElementById(elem.first)!.style.height = document.getElementById(elem.second)!.style.height;
            document.getElementById(elem.second)!.style.height = temp;
        }, i * 50);
    });

    const doc = document.getElementById('screen_pointers')!
    if (tab === 1 || tab === 2){
        if (doc.textContent === null){
            doc.textContent = JSON.stringify(i)
        } else if (doc.textContent === '' || i > parseInt(doc.textContent)){
            doc.textContent = JSON.stringify(i)
        }
    }

    setTimeout(()=>{
        if (tab === 1 || tab === 2){
            if (doc.textContent !== null && i === parseInt(doc.textContent)){
                document.getElementById('app')!.style.pointerEvents = 'auto';
                doc.textContent = '0';
            }
        } else {
            document.getElementById('app')!.style.pointerEvents = 'auto';
        }
    }, i * 50);
}

export const bubbleSort = (jsxArray: JSX.Element[], tab: number) => {
    let visualization: Viz[] = [];
    let swapped = true;

    while (swapped){
        swapped = false;
        for (let i=0;i<jsxArray.length-1;i++){
            if (jsxArray[i].props.children > jsxArray[i+1].props.children){
                visualization.push({
                    first: jsxArray[i].props.id,
                    second: jsxArray[i+1].props.id
                });
                let temp = jsxArray[i];
                jsxArray[i] = <div className="sortColumn" id={jsxArray[i].props.id}>{jsxArray[i+1].props.children}</div>;
                jsxArray[i+1] = <div className="sortColumn" id={jsxArray[i+1].props.id}>{temp.props.children}</div>;
                swapped = true;
            }
        }
    }   
    play(visualization, tab);
}

export const selectionSort = (jsxArray: JSX.Element[], tab: number) => {
    let visualization: Viz[] = [];

    for (let i=0;i<jsxArray.length;i++){
        let smaller = i;
        for (let j=i+1;j<jsxArray.length;j++){
            if (jsxArray[smaller].props.children > jsxArray[j].props.children){
                smaller = j;
            }
        }
        if (smaller !== i){
            visualization.push({
                first: jsxArray[i].props.id,
                second: jsxArray[smaller].props.id
            });
            let temp = jsxArray[i];
            jsxArray[i] = <div className="sortColumn" id={jsxArray[i].props.id}>{jsxArray[smaller].props.children}</div>;
            jsxArray[smaller] = <div className="sortColumn" id={jsxArray[smaller].props.id}>{temp.props.children}</div>;
        }
    }
    play(visualization, tab);
}

export const quickSort = (jsxArray: JSX.Element[], tab: number) => {
    let visualization: Viz[] = [];

    const partition = (low: number, high: number) => {
        let x: number = jsxArray[high].props.children;
        let i = low;

        for (let j=low;j<high;j++){
            if (jsxArray[j].props.children < x){
                visualization.push({
                    first: jsxArray[i].props.id,
                    second: jsxArray[j].props.id
                });
                let temp = jsxArray[i];
                jsxArray[i] = <div className="sortColumn" id={jsxArray[i].props.id}>{jsxArray[j].props.children}</div>;
                jsxArray[j] = <div className="sortColumn" id={jsxArray[j].props.id}>{temp.props.children}</div>;
                i += 1;
            }
        }
        visualization.push({
            first: jsxArray[i].props.id,
            second: jsxArray[high].props.id
        });
        let temp = jsxArray[i];
        jsxArray[i] = <div className="sortColumn" id={jsxArray[i].props.id}>{jsxArray[high].props.children}</div>;
        jsxArray[high] = <div className="sortColumn" id={jsxArray[high].props.id}>{temp.props.children}</div>;

        return i;
    }

    const sort = (low: number, high: number) => {
        if (low < high){
            let p = partition(low, high);

            sort(low, p - 1);
            sort(p + 1, high);
        }
    }

    sort(0, jsxArray.length - 1);

    play(visualization, tab);
}