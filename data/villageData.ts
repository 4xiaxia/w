import { PointOfInterest, TourRoute, POIDetail } from '../types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504981822394-b2586a54c667?q=80&w=800&auto=format&fit=crop';

export const villagePOIs: PointOfInterest[] = [
  // Red POIs
  {
    id: "poi_donglired_xinhaijinianguan001", name: "永春辛亥革命纪念馆", local_name: "辛亥纪念馆", type: "red",
    desc: "为了弘扬郑玉指大忠大孝的精神，东里村设立郑玉指展厅，纪念其爱国事迹。永春为闽南著名侨乡，30多位华侨追随孙中山参加革命，纪念馆依托郑氏宗祠修建，展示永春人与辛亥革命渊源。",
    location: "东里村", images: [], video: "", recognizable: ["青石板台阶", "老式木桌", "革命标语拓片", "煤油灯"],
    duration: "20分钟", open_time: "全年", tips: "院内禁止吸烟", related_knowledge: ["history"], related_pois: [],
    lat: 25.234112, lng: 118.205240, image: 'https://images.unsplash.com/photo-1565738870321-24898733c7f2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_donglired_jingyizhuang001", name: "旌义状石碑（侨光亭内）", local_name: "旌义状", type: "red",
    desc: "1912年孙中山亲颁'旌义状'予郑玉指，表彰其革命贡献。碑文勒石，全国罕见，立于侨光亭内，见证东里华侨爱国情怀。",
    location: "东里村", images: [], video: "", recognizable: ["侨光亭", "旌义状石碑"],
    duration: "20分钟", open_time: "全年", tips: "院内禁止吸烟", related_knowledge: ["history"], related_pois: [],
    lat: 25.235664, lng: 118.204237, image: 'https://images.unsplash.com/photo-1516894916297-ac29a2889989?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_red_guntou", name: "古炮楼（瞭望塔）", local_name: "古炮楼", type: "red",
    desc: "始建于明代，清末重建，抗日战争时期作为瞭望哨使用，位于布兜山顶，可俯瞰全村，具有抗倭、抗匪、抗战的历史意义。",
    location: "布兜山顶", images: [], video: "", recognizable: ["古炮楼墙体", "瞭望孔"],
    duration: "40分钟", open_time: "全年", tips: "山路较陡，注意安全", related_knowledge: ["history", "military"], related_pois: ["poi_donglired_xinhaijinianguan001"],
    lat: 25.2335, lng: 118.2065, image: 'https://images.unsplash.com/photo-1528925348884-a1a795558235?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_red_jiqing", name: "集庆廊桥", local_name: "集庆廊桥", type: "red",
    desc: "清末始建，1956年旅菲侨亲重修，2016年旅星侨亲郑少华捐资重建，是侨胞参与家乡建设的历史见证，展现传统闽南建筑工艺。",
    location: "东里村水口", images: [], video: "", recognizable: ["木结构廊桥", "石墩基础"],
    duration: "30分钟", open_time: "全年", tips: "不可在桥上堆放杂物", related_knowledge: ["architecture", "overseas_chinese"], related_pois: ["poi_donglired_jingyizhuang001"],
    lat: 25.2328, lng: 118.2040, image: 'https://images.unsplash.com/photo-1616363039023-247963665853?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_red_yangwei", name: "洋杆尾古民居群", local_name: "洋杆尾古民居", type: "red",
    desc: "包含革命烈士郑拔桶故居，闽南传统民居建筑，展现侨乡文化特色，记录华侨抗日、支援革命的历史。",
    location: "洋杆尾", images: [], video: "", recognizable: ["闽南古建筑", "砖石结构"],
    duration: "1小时", open_time: "全年", tips: "保护古建筑，禁止破坏", related_knowledge: ["architecture", "revolutionary_history"], related_pois: ["poi_donglired_xinhaijinianguan001"],
    lat: 25.2365, lng: 118.2081, image: 'https://images.unsplash.com/photo-1570020291459-a50d277a8846?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_red_wanzhu", name: "昭灵宫", local_name: "昭灵宫", type: "folk", // Type is folk as per user data
    desc: "武安尊王圣诞巡境重要场所，传统闽南建筑工艺，民间信仰文化，每年农历六月十七举行盛大巡境活动。",
    location: "东里村中心", images: [], video: "", recognizable: ["庙宇建筑", "祭祀器物"],
    duration: "30分钟", open_time: "全年", tips: "参与祭祀活动请保持肃静", related_knowledge: ["folk_religion", "architecture"], related_pois: [],
    lat: 25.2350, lng: 118.2062, image: 'https://images.unsplash.com/photo-1583595159493-47a323381e64?q=80&w=800&auto=format&fit=crop',
  },
  // Ecology POIs
  {
    id: "poi_ecology_xianling", name: "仙灵瀑布", local_name: "仙灵瀑布", type: "ecology",
    desc: "垂直120米，福建省内落差最大瀑布之一，中段有水帘古道，下有深潭，是自然探险和摄影胜地。",
    location: "仙灵山", images: [], video: "", recognizable: ["瀑布水流", "水帘古道"],
    duration: "2小时", open_time: "全年", tips: "雨季注意安全，遵守导游指引", related_knowledge: ["waterfall", "ecology"], related_pois: [],
    lat: 25.2410, lng: 118.1998, image: 'https://images.unsplash.com/photo-1500373994222-21c8114a385f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_ecology_doumo", name: "豆磨古寨", local_name: "豆磨古寨", type: "ecology",
    desc: "明嘉靖年间抗倭历史遗址，位于山顶可俯瞰全村梯田与山林，是了解山地生态系统和抗倭历史的重要场所。",
    location: "豆磨山", images: [], video: "", recognizable: ["古寨遗址", "抗倭工事"],
    duration: "1.5小时", open_time: "全年", tips: "山路较陡，需专业向导带领", related_knowledge: ["history", "ecology"], related_pois: ["poi_ecology_xianling"],
    lat: 25.2395, lng: 118.2105, image: 'https://images.unsplash.com/photo-1621308316819-836749460424?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_ecology_shuiku", name: "东里水库", local_name: "东里水库", type: "ecology",
    desc: "东里村主要水源地，湖光山色，碧水蓝天，是休闲观光、生态教育的重要场所。",
    location: "东里村北部", images: [], video: "", recognizable: ["水库大坝", "湖面景观"],
    duration: "1小时", open_time: "全年", tips: "禁止游泳和垂钓，保护水源", related_knowledge: ["water_resource", "ecology"], related_pois: ["poi_ecology_xianling"],
    lat: 25.237795, lng: 118.203624, image: 'https://images.unsplash.com/photo-1522693335829-9c10b6d21134?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_ecology_farm", name: "防癌功能农业基地", local_name: "功能农业基地", type: "ecology",
    desc: "展示13种防癌功能作物，包括高花色苷黑米、高β胡萝卜素甘薯等，提供农业科普和采摘体验。",
    location: "东里村南部", images: [], video: "", recognizable: ["农作物标识", "农业设施"],
    duration: "1.5小时", open_time: "全年", tips: "采摘活动需额外付费", related_knowledge: ["agriculture", "health"], related_pois: [],
    lat: 25.2310, lng: 118.2075, image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_ecology_orange", name: "百香果/黄金果园", local_name: "特色果园", type: "ecology",
    desc: "种植百香果和黄金果等特色水果，提供果园观光、采摘体验和果品加工体验。",
    location: "东里村东部", images: [], video: "", recognizable: ["果树", "果园设施"],
    duration: "1小时", open_time: "3-11月", tips: "果品季节性强，请提前咨询", related_knowledge: ["agriculture", "fruit"], related_pois: ["poi_ecology_farm"],
    lat: 25.2345, lng: 118.2120, image: 'https://images.unsplash.com/photo-1591287383637-a2461a4c8485?q=80&w=800&auto=format&fit=crop',
  },
  // Folk POIs
  {
    id: "poi_folk_hunqing", name: "传统婚庆习俗体验", local_name: "婚庆习俗", type: "folk",
    desc: "闽南传统婚庆仪式体验，包括\"新扇换旧扇\"\"过风炉\"等传统婚俗环节，展现闽南婚嫁文化。",
    location: "东里村文化体验中心", images: [], video: "", recognizable: ["传统服饰", "婚俗道具"],
    duration: "1.5小时", open_time: "全年", tips: "可提前预约参与体验", related_knowledge: ["folk", "marriage", "tradition"], related_pois: [],
    lat: 25.235251, lng: 118.209183, image: 'https://images.unsplash.com/photo-1520854221256-17452cc3da25?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_folk_heding", name: "池头古民居群", local_name: "池头古民居", type: "folk",
    desc: "传统闽南民居建筑群，展示闽南传统建筑工艺和民间生活文化，是了解侨乡文化的重要场所。",
    location: "池头", images: [], video: "", recognizable: ["闽南古建筑", "传统生活场景"],
    duration: "1小时", open_time: "全年", tips: "保护古建筑，禁止破坏", related_knowledge: ["architecture", "folk_culture"], related_pois: [],
    lat: 25.2372, lng: 118.2068, image: 'https://images.unsplash.com/photo-1615838573954-a63015485459?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: "poi_folk_yinglong", name: "迎龙灯活动", local_name: "迎龙灯", type: "folk",
    desc: "春节期间传统民俗活动，龙灯巡游、舞狮表演等传统民俗活动，展现闽南传统年俗文化。",
    location: "东里村主要街道", images: [], video: "", recognizable: ["龙灯", "舞狮"],
    duration: "2小时", open_time: "春节期间", tips: "活动期间注意安全，遵守现场秩序", related_knowledge: ["folk", "spring_festival", "dragon_dance"], related_pois: [],
    lat: 25.2358, lng: 118.2055, image: 'https://images.unsplash.com/photo-1544832537-5a7a72d336e7?q=80&w=800&auto=format&fit=crop',
  }
];

export const tourRoutes: TourRoute[] = [
    // Red Routes
    {
      id: "poi_route_red_light", name: "红色革命追忆路线-轻量级", local_name: "轻量级红色路线", type: "route_red",
      desc: "短小精炼的红色文化体验，适合学游、党团活动，核心景点：辛亥革命纪念馆、旌义状石碑、古炮楼、集庆廊桥",
      location: "东里村红色文化区", images: ["/assets/images/route_red_light_1.jpg"], video: "", recognizable: ["红色文化标识", "革命标语"],
      duration: "3-4小时", open_time: "全年", tips: "团队活动请提前预约讲解服务",
      related_knowledge: ["history"], related_pois: ["poi_donglired_xinhaijinianguan001", "poi_donglired_jingyizhuang001", "poi_red_guntou", "poi_red_jiqing"],
      route_config: {
        type: "half_day", difficulty: "easy", target_audience: ["students", "party_building", "education"],
        highlight: "红色文化体验", service_items: ["guide_service", "educational_materials", "photography_service"],
      },
      image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad25?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "poi_route_red_one_day", name: "红色革命老区文化一日游", local_name: "红色老区一日游", type: "route_red",
      desc: "深度红色文化体验，涵盖华侨革命历史、侨乡文化、革命老区发展，核心思想：不忘老区革命精神、爱国自强不息",
      location: "东里村全域", images: ["/assets/images/route_red_one_day_1.jpg", "/assets/images/route_red_one_day_2.jpg"], video: "",
      recognizable: ["红色旗帜", "革命标语牌"], duration: "8小时", open_time: "全年", tips: "含午餐体验，需提前预订",
      related_knowledge: ["history", "economy", "culture"],
      related_pois: ["poi_donglired_xinhaijinianguan001", "poi_donglired_jingyizhuang001", "poi_red_guntou", "poi_red_wanzhu", "poi_red_yangwei"],
      route_config: {
        type: "one_day", difficulty: "medium", target_audience: ["leaders", "media", "overseas_chinese", "enterprises"],
        theme: "红色血脉·侨乡情怀", service_items: ["expert_guide", "red_theme_meal", "evening_forum", "cultural_activities"],
      },
      image: "https://images.unsplash.com/photo-1550381022-720e36321b3c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "poi_route_red_folk_taiwan", name: "红色文化闽台民俗文化游", local_name: "闽台红色民俗游", type: "route_red_folk",
      desc: "红色文化与传统民俗深度融合，闽台文化纽带体验，涵盖传统婚庆习俗、昭灵宫巡境、迎龙灯等民俗活动",
      location: "东里村文化体验区", images: ["/assets/images/route_red_folk_taiwan_1.jpg"], video: "",
      recognizable: ["闽台文化符号", "传统装饰"], duration: "2-3天", open_time: "全年", tips: "民俗活动有季节性，请提前了解时间安排",
      related_knowledge: ["folk", "cross_strait", "culture"],
      related_pois: ["poi_donglired_xinhaijinianguan001", "poi_red_wanzhu", "poi_folk_hunqing", "poi_folk_yinglong"],
      route_config: {
        type: "multi_day", difficulty: "medium", target_audience: ["cultural_exchange", "research_groups", "cross_strait_visitors"],
        theme: "红色纽带·两岸同源", service_items: ["folk_experts", "cultural_workshop", "cross_strait_forum", "participation_in_folk_activities"],
      },
      image: "https://images.unsplash.com/photo-1547322369-00e999e0a783?q=80&w=800&auto=format&fit=crop",
    },
    // Ecology Routes
    {
      id: "poi_route_ecology_light", name: "自然生态民俗游-休闲半日游", local_name: "生态休闲游", type: "route_ecology",
      desc: "轻松休闲的自然生态体验，路线：东里水库→仙灵瀑布→生态步道，适合家庭休闲",
      location: "东里村自然景观区", images: ["/assets/images/route_ecology_light_1.jpg"], video: "", recognizable: ["生态标识", "自然景观指示牌"],
      duration: "3-4小时", open_time: "全年", tips: "建议穿着舒适的运动鞋",
      related_knowledge: ["ecology", "landscape"], related_pois: ["poi_ecology_shuiku", "poi_ecology_xianling", "poi_ecology_doumo"],
      route_config: {
        type: "half_day", difficulty: "easy", target_audience: ["families", "nature_lovers", "photography"],
        theme: "山水东里·生态田园", service_items: ["nature_guide", "photography_service", "natural_products"],
      },
      image: "https://images.unsplash.com/photo-1444492417251-9f126a1f8467?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "poi_route_ecology_one_day", name: "自然生态民俗游-生态文化一日游", local_name: "生态文化一日游", type: "route_ecology",
      desc: "生态文化与农耕体验结合，上午自然景观，下午农耕体验，晚上民俗活动，展现山水田园之美",
      location: "东里村生态农业区", images: ["/assets/images/route_ecology_one_day_1.jpg"], video: "",
      recognizable: ["农产品标识", "农耕工具展示"], duration: "8小时", open_time: "全年", tips: "含农家午餐体验，农产品采摘需额外付费",
      related_knowledge: ["agriculture", "ecology", "folk"], related_pois: ["poi_ecology_doumo", "poi_ecology_shuiku", "poi_ecology_farm", "poi_ecology_orange"],
      route_config: {
        type: "one_day", difficulty: "medium", target_audience: ["families", "rural_experience", "organic_food_lovers"],
        theme: "山水田园·农耕体验", service_items: ["agriculture_guide", "organic_meal", "fruit_picking", "folk_performance"],
      },
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "poi_route_folk_deep", name: "自然生态民俗游-深度民俗文化体验游", local_name: "深度民俗游", type: "route_folk",
      desc: "深度参与当地民俗文化活动，包括传统婚庆、昭灵宫巡境、迎龙灯等特色民俗活动体验",
      location: "东里村民俗文化区", images: ["/assets/images/route_folk_deep_1.jpg"], video: "",
      recognizable: ["民俗装饰", "传统服饰"], duration: "2-3天", open_time: "全年", tips: "部分民俗活动需根据传统时间安排",
      related_knowledge: ["folk", "tradition", "culture"], related_pois: ["poi_red_wanzhu", "poi_folk_hunqing", "poi_folk_heding", "poi_folk_yinglong"],
      route_config: {
        type: "multi_day", difficulty: "medium", target_audience: ["cultural_research", "experience_travelers", "folk_enthusiasts"],
        theme: "民俗东里·文化传承", service_items: ["folk_experts", "traditional_clothing", "ceremony_participation", "cultural_workshop"],
      },
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    },
];

// High-quality, static POI details.
export const poiDetails: Record<string, POIDetail> = {
  "poi_donglired_xinhaijinianguan001": {
    story: "走进这座古老的郑氏宗祠，仿佛能听到百年前革命的回响。这里不仅是为了纪念郑玉指先生的忠孝爱国，更是为了铭记三十多位永春华侨追随孙中山先生的脚步，投身革命的壮丽诗篇。每一件展品背后，都是一段热血沸腾的侨乡传奇。",
    subTopics: [
      { title: "历史渊源", content: "纪念馆依托于郑氏宗祠修建，这座古建筑本身就是历史的承载者。它见证了永春——这个闽南著名侨乡，如何将家族荣耀与国家命运紧密相连，最终成为辛亥革命在福建的一处重要策源地。" },
      { title: "文化特色", content: "这里的特别之处在于它将宗族文化与革命历史完美融合。您既能看到传统祠堂的精美木雕与建筑格局，也能感受到革命年代的简朴与激情。这种独特的文化交织，是侨乡精神最生动的体现。" },
      { title: "游览看点", content: "参观时，请留意那些珍贵的历史照片和文献，它们无声地讲述着革命先辈的故事。院内的“旌义状”石碑更是镇馆之宝，是孙中山先生亲颁的荣誉，全国罕见，不容错过。请注意，院内禁止吸烟。" }
    ]
  },
  "poi_donglired_jingyizhuang001": {
    story: "阳光透过侨光亭的屋檐，洒在这块历经沧桑的石碑上。这便是孙中山先生于1912年亲手颁发给郑玉指的'旌义状'。它不只是一份荣誉，更是一座丰碑，铭刻着东里华侨心系家国、无私奉献的赤子之心，是整个村庄的骄傲。",
    subTopics: [
      { title: "历史渊源", content: "辛亥革命成功后，为表彰郑玉指等华侨的巨大贡献，孙中山先生特颁此状。后来，乡人将其勒石成碑，立于侨光亭内，使其爱国精神得以流芳百世，激励后人。" },
      { title: "文化特色", content: "这块石碑是研究辛亥革命史和华侨史的珍贵实物资料。它的存在，让东里村的红色文化有了最核心、最权威的见证。它也是连接过去与现在的桥梁，提醒着我们勿忘历史。" },
      { title: "游览看点", content: "驻足碑前，您可以仔细品读碑文，感受那个风云激荡年代的家国情怀。石碑与古朴的侨光亭相得益彰，构成了一幅宁静而庄重的历史画卷。拍照留念时，请勿触摸石碑。" }
    ]
  },
  "poi_red_guntou": {
    story: "站在这座布兜山顶的古炮楼上，整个东里村的美景尽收眼底。它像一位沉默的卫士，从明朝抗倭到近代抗战，始终守护着这片土地。炮楼上的每一个瞭望孔，都曾凝视过历史的风云变幻，充满了故事。",
    subTopics: [
      { title: "历史渊源", content: "炮楼始建于明代，最初为抵御倭寇而建。清末重建后，在抗日战争时期，这里成为了重要的瞭望哨所，为保卫家园立下了汗马功劳。它是东里村军事历史的活化石。" },
      { title: "建筑特色", content: "炮楼的设计兼具实用性与防御性，厚实的墙体、狭小的射击孔，无不体现出古代军事建筑的智慧。登上炮楼，不仅可以体验‘一夫当关，万夫莫开’的气势，还能欣赏到绝佳的乡村风光。" },
      { title: "游览看点", content: "攀登过程本身就是一种体验，山路虽有些陡峭，但登顶后的豁然开朗绝对值得。建议在天气晴朗时前来，视野极佳。请注意脚下安全，爱护古建筑。" }
    ]
  },
  "poi_red_jiqing": {
    story: "漫步于集庆廊桥之上，脚下的流水潺潺，廊顶的木瓦飘香。这座桥不仅连接着溪流的两岸，更连接着海外侨胞与故土的深情。从清末的初建到后来的数次重修，每一块木板、每一片瓦，都凝聚着侨亲们对家乡沉甸甸的爱。",
    subTopics: [
      { title: "历史渊源", content: "此桥始建于清末，后因年久失修而倾颓。1956年，旅菲侨亲率先捐资重修；2016年，旅星侨亲郑少华先生再次慷慨解囊重建。它是一座名副其实的‘侨心桥’，是侨乡发展的生动缩影。" },
      { title: "建筑特色", content: "集庆廊桥采用了典型的闽南传统廊桥工艺，木石结构，飞檐翘角，古朴典雅。它不仅是交通要道，更是村民们遮风避雨、休憩交流的公共空间，充满了生活气息。" },
      { title: "游览看点", content: "在桥上小坐片刻，感受乡村的宁静与惬意。欣赏桥梁的榫卯结构和精湛的木工技艺，是了解闽南传统建筑的绝佳机会。请注意，为保持桥梁整洁，不可在桥上堆放杂物。" }
    ]
  },
  "poi_red_yangwei": {
    story: "洋杆尾的古厝群静静地诉说着侨乡的往事。这里不仅有革命烈士郑拔桶的故居，更是一片保存完好的闽南传统民居建筑群。红砖古厝，燕尾飞檐，每一处都体现着浓厚的侨乡文化特色和华侨们支援革命的峥嵘岁月。",
    subTopics: [
      { title: "历史渊源", content: "这片古民居是东里村华侨文化的集中体现。其中，革命烈士郑拔桶的故居是重要的红色教育基地，记录了华侨先辈为抗日战争和解放事业作出的卓越贡献。" },
      { title: "建筑特色", content: "典型的“皇宫起”红砖建筑，硬山式屋顶与高高翘起的燕尾脊是其最显著的特征。建筑群落布局规整，既有大家族的气派，又不失生活的温馨，是研究闽南建筑的生动样本。" },
      { title: "游览看点", content: "穿行于古厝的巷弄间，感受时光的沉淀。可以重点参观郑拔桶故居，了解烈士事迹。请尊重当地居民，不要随意进入私人住宅，并共同保护好这些珍贵的古建筑。" }
    ]
  },
  "poi_red_wanzhu": {
    story: "昭灵宫是东里村村民信仰的中心，香火鼎盛，庇佑着一代又一代的东里人。这里供奉着武安尊王，每逢诞辰，盛大的巡境活动热闹非凡，成为全村人共同的节日。它不仅是一座庙宇，更是凝聚乡情的精神家园。",
    subTopics: [
      { title: "民俗活动", content: "每年农历六月十七是武安尊王圣诞，昭灵宫会举行盛大的巡境活动，锣鼓喧天，人山人海，是体验闽南传统民间信仰文化的最佳时机。这是东里村最隆重的民俗盛事之一。" },
      { title: "建筑艺术", content: "宫庙的建筑本身就是一件艺术品，精美的石雕、木雕、剪瓷雕随处可见，屋顶上的双龙戏珠更是栩栩如生，充分展现了闽南传统庙宇建筑的精湛工艺与独特魅力。" },
      { title: "游览提示", content: "非节庆日时，宫庙内十分宁静，适合静心参观。进入宫庙请保持肃静，尊重当地的信仰习俗。您可以为家人朋友祈福，感受这份来自神明的庇佑。" }
    ]
  },
  "poi_ecology_xianling": {
    story: "仿佛一条银龙从天而降，仙灵瀑布以120米的巨大落差，在山谷间奏响雄壮的交响乐。水雾弥漫，阳光下时常能看到绚丽的彩虹。瀑布中段有一条奇特的水帘古道，穿行其间，如入仙境，是探险与摄影爱好者的天堂。",
    subTopics: [
      { title: "自然奇观", content: "作为福建省内落差最大的瀑布之一，仙灵瀑布的壮丽景观令人叹为观止。丰水期时，水流如万马奔腾，声震山谷；枯水期则如轻纱拂面，温婉秀丽，四季皆有不同景致。" },
      { title: "探险体验", content: "最具特色的莫过于水帘古道，游客可以从瀑布后方穿行而过，感受被水幕包围的奇妙体验。瀑布下方的深潭清澈见底，是夏日避暑的绝佳去处。" },
      { title: "游览提示", content: "雨季或丰水期游览时，请务必注意脚下湿滑，听从导游指引，确保安全。穿着防水防滑的鞋子，并保护好您的电子设备，以免被水雾浸湿。" }
    ]
  },
  "poi_ecology_doumo": {
    story: "豆磨山顶的古寨遗址，是明朝嘉靖年间抗倭历史的铁证。站在残存的工事旁，依稀能感受到当年军民同仇敌忾、浴血奋战的场景。如今硝烟散尽，这里视野开阔，梯田与山林构成了一幅绝美的生态画卷。",
    subTopics: [
      { title: "历史回响", content: "这座古寨是为抵御倭寇侵扰而修建的军事要塞。它不仅是东里村，也是整个闽南地区抗倭历史的重要遗址，对于研究古代军事防御体系有重要价值。" },
      { title: "生态景观", content: "从山顶俯瞰，层层叠叠的梯田如诗如画，远处的山峦连绵起伏。这里是了解山地生态系统、欣赏田园风光的绝佳观景平台，也是进行生态教育的天然课堂。" },
      { title: "游览提示", content: "由于古寨位于山顶，山路较为陡峭且未经完全开发，建议在专业向导的带领下前往，以确保安全。请穿着适合登山的鞋服，并自备饮用水。" }
    ]
  },
  "poi_ecology_shuiku": {
    story: "东里水库就像一块镶嵌在群山间的翡翠，碧波荡漾，宁静而美好。它不仅是全村人的生命之源，也是一处远离尘嚣的休闲胜地。在这里，您可以尽情呼吸新鲜的空气，欣赏湖光山色，感受大自然的馈赠。",
    subTopics: [
      { title: "生态功能", content: "作为东里村的主要饮用水源地，水库的生态环境保护得非常好。这里水质清澈，四周植被茂盛，是许多鸟类和小型动物的栖息地，构成了一个健康的微型生态系统。" },
      { title: "休闲观光", content: "环湖有平坦的步道，非常适合散步、慢跑或骑行。无论是清晨的薄雾，还是傍晚的落日，水库的景色都美不胜收，是摄影和写生的好地方。" },
      { title: "游览提示", content: "为了保护这片珍贵的水源，水库区域内严禁游泳、垂钓和乱扔垃圾。让我们共同守护这一方碧水蓝天，让它永远清澈美丽。" }
    ]
  },
  "poi_ecology_farm": {
    story: "这里不只是普通的农田，而是一个充满科技感的“健康农场”。这片防癌功能农业基地，种植着高花色苷的黑米、富含β胡萝卜素的甘薯等13种特殊作物。它们不仅美味，更承载着用农业科技守护人们健康的希望。",
    subTopics: [
      { title: "农业科普", content: "基地通过图文并茂的展板和实物展示，向游客科普功能农业的知识，介绍各种作物的特殊营养价值和健康功效。这是一个寓教于乐的农业科技课堂。" },
      { title: "采摘体验", content: "在特定的季节，基地会开放部分区域供游客采摘。亲手从田里收获健康的果实，不仅能体验农耕的乐趣，还能将最新鲜、最营养的农产品带回家。" },
      { title: "游览提示", content: "采摘活动通常需要额外付费，并受季节和作物成熟度的影响，建议提前咨询。请爱护农作物，在指定区域内进行采摘和参观。" }
    ]
  },
  "poi_ecology_orange": {
    story: "走进这片果园，空气中都弥漫着百香果和黄金果的甜香。一排排整齐的果架上，挂满了诱人的果实。在这里，您不仅可以欣赏田园风光，还能亲手采摘最新鲜的水果，体验从枝头到舌尖的极致美味。",
    subTopics: [
      { title: "特色果品", content: "果园主要种植百香果和黄金果等市场上的特色水果。百香果酸甜可口，黄金果清甜多汁，都是营养丰富的健康佳品，深受游客喜爱。" },
      { title: "农事体验", content: "除了采摘，果园还会不定期举办果品加工体验活动，如制作百香果酱、鲜榨果汁等。这不仅能让您品尝到自己的劳动成果，还能学到不少水果保鲜和加工的小技巧。" },
      { title: "游览提示", content: "水果的成熟期集中在每年的3月到11月，不同月份有不同的果品可供采摘。出行前最好提前电话咨询果园，了解当季的果品信息和开放情况。" }
    ]
  },
  "poi_folk_hunqing": {
    story: "想体验一场原汁原味的闽南传统婚礼吗？在这里，您可以亲身参与到“新扇换旧扇”、“过风炉”等充满寓意的婚俗环节中。大红的花轿，热闹的唢呐，每一个细节都展现着闽南婚嫁文化的独特魅力与美好祝福。",
    subTopics: [
      { title: "婚俗环节", content: "体验活动完整复刻了闽南传统婚嫁的核心仪式，如“上头”、“出阁”、“踢轿门”等。每个环节都有其独特的象征意义，是对新人百年好合、早生贵子的美好祝愿。" },
      { title: "文化内涵", content: "闽南婚俗深受儒家文化和海洋文化的影响，既注重礼仪和传承，又充满了热情和活力。通过体验，您可以深入了解这些习俗背后的文化内涵和生活哲学。" },
      { title: "参与提示", content: "婚庆习俗体验活动通常需要提前预约，以便工作人员进行准备。您可以选择作为“新郎”、“新娘”或“宾客”参与其中，活动中心会提供相应的传统服饰。" }
    ]
  },
  "poi_folk_heding": {
    story: "池头古民居群是东里村最富生活气息的地方。一座座红砖古厝鳞次栉比，燕尾脊在蓝天下划出优美的弧线。穿行在狭窄的石板巷里，仿佛能听到邻里的欢声笑语，看到袅袅的炊烟，这里是了解闽南侨乡日常生活的最佳窗口。",
    subTopics: [
      { title: "建筑艺术", content: "这片民居群是闽南“红砖文化”的集中展示区。无论是墙上的砖雕、窗棂的木刻，还是门楼的装饰，都体现了精湛的传统建筑工艺和独特的审美情趣。" },
      { title: "侨乡生活", content: "与许多已完全商业化的古镇不同，这里依然有许多原住民生活其间，保留着传统的生活方式。您可以观察到晒制酱菜、制作手工艺品等真实的闽南生活场景。" },
      { title: "游览提示", content: "参观时请保持安静，尊重当地居民的隐私和生活习惯。这些古建筑是宝贵的文化遗产，请不要攀爬或刻画，共同守护这份历史的馈赠。" }
    ]
  },
  "poi_folk_yinglong": {
    story: "每当春节来临，东里村的夜晚便被璀璨的龙灯点亮。伴随着震天的锣鼓和鞭炮声，村民们簇拥着巨龙穿街过巷，祈求新的一年风调雨顺、国泰民安。迎龙灯不仅是一场视觉盛宴，更是凝聚全村人情感与希望的年度盛典。",
    subTopics: [
      { title: "活动盛况", content: "迎龙灯活动通常在元宵节前后达到高潮。除了巨龙巡游，还有舞狮、大鼓吹、南音表演等丰富的民俗活动，整个村庄都沉浸在欢乐的海洋中。" },
      { title: "文化传承", content: "迎龙灯的习俗在东里村已传承数百年，是闽南年俗文化的重要组成部分。它承载着村民们对龙图腾的崇拜，也体现了团结协作、奋发向上的社区精神。" },
      { title: "参与提示", content: "活动期间人流量大，请注意看管好自己的财物和小孩，遵守现场的秩序安排。您可以跟随巡游队伍，感受这份独特的年味，但请注意与表演队伍保持安全距离。" }
    ]
  }
};
