import { MouseEvent, useState } from "react";
import { TwoDaySalesGraphic } from "./TwoDaySalesGraphic"
export enum SalesHomePageTabs {
    TODAY_YERSTERDAY = 1,
    WEEK = 2,
    MONTH = 3
  }
export const SalesGraphics = () => {

  const [salesTab, setSalesTab] = useState(SalesHomePageTabs.TODAY_YERSTERDAY);

  const handleChangeTab = (e: MouseEvent<HTMLButtonElement>) => {
    const tabIndicator = parseInt(e.currentTarget.dataset.tab!);
    if (tabIndicator && tabIndicator == salesTab) return;
    setSalesTab(tabIndicator)
  }

  return (
    <div className="flex flex-col items-center ">
        <h4 className="font-medium text-4xl mb-5">Ventas</h4>
        {/* <div className="flex gap-2 mb-5">
          <Button
            onClick={handleChangeTab}
            data-tab={SalesHomePageTabs.TODAY_YERSTERDAY}
            className={`${salesTab === SalesHomePageTabs.TODAY_YERSTERDAY ? 'ring-[2px] ring-blue-500' : ''} rounded-sm bg-slate-100 hover:bg-slate-200 shadow-md ring-1 ring-slate-300 `}
            style={{ color: '#444' }}
          >
            Ayer y hoy
          </Button>
          <Button
            onClick={handleChangeTab}
            data-tab={SalesHomePageTabs.WEEK}
            className={`${salesTab === SalesHomePageTabs.WEEK ? 'ring-[2px] ring-blue-500' : ''} rounded-sm bg-slate-100 hover:bg-slate-200 shadow-md ring-1 ring-slate-300 `}
            style={{ color: '#444' }}
          >
            Semana
          </Button>
          <Button
            onClick={handleChangeTab}
            data-tab={SalesHomePageTabs.MONTH}
            className={`${salesTab === SalesHomePageTabs.MONTH ? 'ring-[2px] ring-blue-500' : ''} rounded-sm bg-slate-100 hover:bg-slate-200 shadow-md ring-1 ring-slate-300 `}
            style={{ color: '#444' }}
          >
            Mes
          </Button>
        </div> */}
        <TwoDaySalesGraphic />
      </div>
  )
}
