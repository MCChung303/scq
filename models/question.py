from models.basemodel import BaseModel
import random
import services.lorem_ipsum as lorem_ipsum


class Question(BaseModel):

    RESPONSE_FREE = 'freeResponse'
    RESPONSE_MULTIPLE_CHOICE = 'multipleChoice'
    RESPONSE_TRUE_OR_FALSE = 'trueOrFalse'
    RESPONSE_RATING = 'rating'

    USER_RESPONSE_FORMAT = [RESPONSE_FREE, RESPONSE_MULTIPLE_CHOICE, RESPONSE_TRUE_OR_FALSE, RESPONSE_RATING]

    def strictSchema(self):
        return True

    def requiredFields(self):
        return ['title', 'response_format', 'options']

    def fields(self):
        return {
            'title': (self.is_string, self.is_not_empty, ),
            'response_format': (self.is_string, self.is_in_list(self.USER_RESPONSE_FORMAT),),
            'options': (self.is_list,)
        }

    def default(self):
        return {
            'title': "",
            'response_format': "",
            'options': []
        }

    def create_generic_options(self, response_format):
        if response_format == self.RESPONSE_TRUE_OR_FALSE:
            return ['yes', 'no']
        if response_format == self.RESPONSE_MULTIPLE_CHOICE:
            return ['alpha', 'beta', 'gamma', 'delta']
        return []

    def create_generic_item(self):
        data = self.default()
        data['title'] = lorem_ipsum.lorem_ipsum()
        data['response_format'] = random.choice(self.USER_RESPONSE_FORMAT)
        data['options'] = self.create_generic_options(data['response_format'])
        return Question().create_item(data)
