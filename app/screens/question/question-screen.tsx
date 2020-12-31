import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import React, { useEffect, useState } from "react"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"

import { Question } from "../../services/api/api.types"
import { observer } from "mobx-react-lite"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  paddingHorizontal: spacing[24],
  backgroundColor: color.background,
  flex: 1,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing[48],
  marginBottom: spacing[12],
}

const QUESTION: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing[12],
}

const QUESTION_WRAPPER: ViewStyle = {
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  paddingVertical: spacing[24],
}

const QUESTION_LIST: ViewStyle = {
  marginBottom: spacing[24],
}

const ANSWER: TextStyle = {
  fontSize: 12,
}

const ANSWER_WRAPPER: ViewStyle = {
  paddingVertical: spacing[8],
}

export const QuestionScreen = observer(function QuestionScreen() {
  // Pull in one of our MST stores
  const { questionStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [refreshing, setRefreshing] = useState(true)

  const fetchQuestions = async () => {
    setRefreshing(true)
    if (questionStore.questions.length === 0) await questionStore.getQuestions()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const renderQuestion = ({ item }) => {
    const question: Question = item
    return (
      <View style={QUESTION_WRAPPER}>
        <Text style={QUESTION} text={question.question} />
        <View>
          {question.allAnswers.map((a, index) => {
            return (
              <View key={index} style={ANSWER_WRAPPER}>
                <Text style={ANSWER} text={a} />
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <Screen style={ROOT} >
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="questionScreen.header" />
        </View>
        <FlatList
          style={QUESTION_LIST}
          data={questionStore.questions}
          renderItem={renderQuestion}
          extraData={{ extraDataForMobX: questionStore.questions.length > 0 ? questionStore.questions[0].question : "" }}
          keyExtractor={item => item.question}
          onRefresh={fetchQuestions}
          refreshing={refreshing}
        />
      </Screen>
  )
})
