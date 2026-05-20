import os
from dotenv import load_dotenv
from langchain_upstage import ChatUpstage
from langchain_core.prompts import ChatPromptTemplate
from prompts.templates import PROMPTS

load_dotenv()

class ToneConverter:
    def __init__(self):
        self.api_key = os.getenv("UPSTAGE_API_KEY")
        if not self.api_key:
            raise ValueError("UPSTAGE_API_KEY not found in environment variables")
        
        # Solar-Pro 모델 초기화
        self.llm = ChatUpstage(model="solar-pro", api_key=self.api_key)

    async def convert(self, text: str, target_audience: str) -> str:
        if target_audience not in PROMPTS:
            raise ValueError(f"Invalid target audience: {target_audience}")

        system_prompt = PROMPTS[target_audience]
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{text}"),
        ])

        chain = prompt | self.llm
        
        response = await chain.ainvoke({"text": text})
        return response.content

# 싱글톤 인스턴스
converter = ToneConverter()
