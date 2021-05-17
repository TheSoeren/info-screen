import ChoreRepetition from './ChoreRepetition.ts'
import ChoreIcon from './ChoreIcon.ts'

interface Chore {
    id: string
    name: string
    repetition: ChoreRepetition
    icon: ChoreIcon
    responsible: Set<string>
    details: string
}

export default Chore;