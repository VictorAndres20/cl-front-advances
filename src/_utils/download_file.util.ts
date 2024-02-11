export const downloadFile = (base64bytes: string, fileName: string) => {
    let a: any = document.createElement('A');
    a.href = `data:application/pdf;base64,${base64bytes}`;
    a.target = '_blank';
    a.download = `${fileName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const downloadExcelFile = (base64bytes: string, fileName: string) => {
    let a: any = document.createElement('A');
    a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64bytes}`;
    a.target = '_blank';
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}