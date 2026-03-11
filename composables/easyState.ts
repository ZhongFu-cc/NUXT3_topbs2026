
//創建全局共享變量,scrollPosition,這是用來儲存滾輪滑動到的位置
//通過export 導出給各個組件使用, 這個變量是一個函數,方法體使用 useState(取一個代稱,以及透過function給個預設值)
//最終返回的是一個Ref 代理對象
export const useScrollPosition = ()=> useState('scrollPosition', ()=>0)

export const useViewportWidth = ()=> useState('viewportWidth',() => 0)