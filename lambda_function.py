import json
import boto3
import uuid
import time

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('NetworkPartnerRequests')
wishlist_table = dynamodb.Table('wishlist')

def lambda_handler(event, context):
    print("Received event:", json.dumps(event))
    try:
        if event.get('body'):
            body = json.loads(event.get('body'))
        else:
            body = event

        request_type = body.get('type', 'partner')
        request_id = str(uuid.uuid4())
        timestamp = int(time.time())

        if request_type == 'waitlist':
            item = {
                'email': body.get('email'),
                'timestamp': timestamp,
                'requestId': request_id,
                'type': 'waitlist'
            }
            wishlist_table.put_item(Item=item)
        else:
            # Default to partner
            item = {
                'requestId': request_id,
                'type': 'partner',
                'organization': body.get('organization'),
                'contact': body.get('contact'),
                'email': body.get('email'),
                'phone': body.get('phone'),
                'timestamp': timestamp,
                'status': 'PENDING'
            }
            table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Submission successful', 'requestId': item['requestId']}),
            'headers': {
                'Content-Type': 'application/json'
                # CORS headers are handled by Function URL config usually, but good to have here too if using Proxy integration
            }
        }
    except Exception as e:
        print("Error:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
