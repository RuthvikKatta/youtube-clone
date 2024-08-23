export function formatTitle(title: string) {
    const SIZE = 65
    if(title.length >= SIZE){
        return title.substring(0, SIZE) + '...';
    } 
    return title
}