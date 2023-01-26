import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

export const TransitionBox: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      transition={{ damping: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
