export type SingleChoiceQuestionT = {type_:string,
			      text: string,
			      correctChoice: number,
			      answers:string[]}

export type QuestionT = SingleChoiceQuestionT


export function isSingleChoiceQuestionT(arg: QuestionT): arg is SingleChoiceQuestionT{
    return (<SingleChoiceQuestionT>arg).type_ === 'single_choice'
}
