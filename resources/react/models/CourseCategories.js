import {
  cibPython,
  cibPhp,
  cibKotlin,
  cibJava,
  cibSwift,
  cibJavascript,
  cibPowershell,
  cibHtml5,
  cilSchool,
  cilBarChart,
  cilBasket,
  cilBank,
  cilCash,
  cilGraph,
  cilChartLine,
  cilAnimal,
  cifFr,
  cifGb,
  cifIt,
  cifRu,
  cifCz,
  cifUa,
  cifPl,
  cifCn,
  cifDe,
} from '@coreui/icons'
import { Model, CString, CID, CForeign, CDateTime } from './_model'

const icons = [
  { value: 'cibPython', label: 'Python', icon: cibPython },
  { value: 'cibPhp', label: 'PHP', icon: cibPhp },
  { value: 'cibKotlin', label: 'Kotlin', icon: cibKotlin },
  { value: 'cibJava', label: 'Java', icon: cibJava },
  { value: 'cibSwift', label: 'Swift', icon: cibSwift },
  { value: 'cibJavascript', label: 'JavaScript', icon: cibJavascript },
  { value: 'cibPowershell', label: 'PowerShell', icon: cibPowershell },
  { value: 'cibHtml5', label: 'HTML5', icon: cibHtml5 },
  { value: 'cilSchool', label: 'School', icon: cilSchool },
  { value: 'cilBarChart', label: 'BarChart', icon: cilBarChart },
  { value: 'cilBasket', label: 'Basket', icon: cilBasket },
  { value: 'cilBank', label: 'Bank', icon: cilBank },
  { value: 'cilCash', label: 'Cash', icon: cilCash },
  { value: 'cilGraph', label: 'Graph', icon: cilGraph },
  { value: 'cilAnimal', label: 'Animal', icon: cilAnimal },
  { value: 'cilChartLine', label: 'Chartline', icon: cilChartLine },
  { value: 'cifGb', label: 'Great Britain', icon: cifGb },
  { value: 'cifIt', label: 'Italy', icon: cifIt },
  { value: 'cifRu', label: 'Russia', icon: cifRu },
  { value: 'cifCz', label: 'Czech Republic', icon: cifCz },
  { value: 'cifPl', label: 'Poland', icon: cifPl },
  { value: 'cfCn', label: 'China', icon: cifCn },
  { value: 'cifUa', label: 'Ukrain', icon: cifUa },
  { value: 'cifFr', label: 'France', icon: cifFr },
  { value: 'cifDe', label: 'Germany', icon: cifDe },
]

class CourseCategoriesParent extends Model {
  route = '/course/category'
  methods = ['POST', 'GET', 'PUT']
  description = 'Course categories'

  columns = [
    CID.new('name', '#'),
    CString.new('title', 'Title').setMaxlength(255),
    CString.new('description', 'Description').setMaxlength(255),
    CString.new('icon', 'Icon').setOptions(icons).asSelect().asRequired(),
    CDateTime.new('created_at', 'Created').asDisabled(),
    CDateTime.new('updated_at', 'Updated').asDisabled(),
  ]
}

class CourseCategories extends CourseCategoriesParent {
  columns = [...this.columns, CForeign.new('parent_id', 'Parent').setForeign(CourseCategoriesParent).setRequestName('parentId')]
}

export { CourseCategories, icons }
