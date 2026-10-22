import { ProjectReport } from '../types/document';

export const sampleReports: Record<'fr' | 'en' | 'zh', ProjectReport> = {
  fr: {
    id: 'sample-report-fr',
    title: 'Rénovation Énergétique & Réseau CVC - Bâtiment C',
    siteLocation: 'Parc Technologique de Gerland, Lyon',
    date: new Date().toISOString().split('T')[0],
    personnelCount: 6,
    tasks: [
      {
        id: 't-1',
        text: 'Consignation électrique générale et vérification d’absence de tension (VAT).'
      },
      {
        id: 't-2',
        text: 'Dépose de l’ancien groupe frigorifique R410A et récupération sécurisée du fluide.'
      },
      {
        id: 't-3',
        text: 'Raccordement hydraulique de la nouvelle pompe à chaleur haute performance.'
      },
      {
        id: 't-4',
        text: 'Mise en pression d’épreuve à 25 bars et contrôle d’étanchéité aux raccords bridés.'
      },
      {
        id: 't-5',
        text: 'Paramétrage de la gestion technique du bâtiment (GTB) et équilibrage des débits.'
      }
    ],
    generalNotes: 'Intervention terminée dans les délais impartis. Tous les protocoles d’hygiène et sécurité ont été respectés. Aucun incident à signaler.',
    images: [],
    confidentialityNotice: true
  },
  en: {
    id: 'sample-report-en',
    title: 'HVAC Modernization & High-Voltage Retrofit - Facility B',
    siteLocation: 'North Industrial Sector, Dock 7',
    date: new Date().toISOString().split('T')[0],
    personnelCount: 5,
    tasks: [
      {
        id: 't-1',
        text: 'Site lock-out / tag-out (LOTO) protocols established and certified.'
      },
      {
        id: 't-2',
        text: 'Dismantled legacy compressor units and evacuated refrigerants per EPA guidelines.'
      },
      {
        id: 't-3',
        text: 'Installed modular variable-refrigerant-flow (VRF) outdoor condenser units.'
      },
      {
        id: 't-4',
        text: 'Performed hydrostatic pressure test and vacuum decay verification.'
      },
      {
        id: 't-5',
        text: 'Commissioned SCADA telemetry nodes and verified automated dampers.'
      }
    ],
    generalNotes: 'Full installation successfully verified under load. Environmental noise benchmarks met.',
    images: [],
    confidentialityNotice: true
  },
  zh: {
    id: 'sample-report-zh',
    title: '智能制造车间动力配电及暖通节能技术改造',
    siteLocation: '高新产业示范园 4号总装车间',
    date: new Date().toISOString().split('T')[0],
    personnelCount: 8,
    tasks: [
      {
        id: 't-1',
        text: '执行施工区域停电闭锁上锁挂牌（LOTO）及验电接地安全规程。'
      },
      {
        id: 't-2',
        text: '拆卸老旧定频螺杆式制冷机组，完成环保制冷剂无泄漏抽空回收。'
      },
      {
        id: 't-3',
        text: '就位安装新型超高效磁悬浮变频冷水机组，完成抗震支吊架固定。'
      },
      {
        id: 't-4',
        text: '完成主管网水压试验（保持压力1.6MPa无渗漏），并通过监理现场验收。'
      },
      {
        id: 't-5',
        text: '完成楼宇自控系统传感器校准及变频水泵联动联调。'
      }
    ],
    generalNotes: '全天施工规范有序，无安全违章记录。已具备投入负荷试运行条件。',
    images: [],
    confidentialityNotice: true
  }
};
