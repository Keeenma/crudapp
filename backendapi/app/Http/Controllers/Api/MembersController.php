<?php

namespace App\Http\Controllers\Api;

use App\Models\Members;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MembersController extends Controller
{
    #region display mark 8:30 11-27-2023
    public function index()
    {
        $members = Members::all();
        if($members->count() > 0){
            $data = [
                'status' => 200,
                'members' => $members
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => 'No Records found'
            ];
            return response()->json($data, 404);
        }
       
    }
    #endregion

    #region create mark 8:36PM 11-27-2023
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'course' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:11',
        ]);

        if($validator->fails()){

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

        }else{

            $members = Members::create([
                'name' => $request->name,
                'course' => $request->course,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if($members){
                return response()->json([
                    'status' => 200,
                    'message' => "Member added successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong"
                ], 500);
            } 
        }
    }
    #endregion

    #region show mark 8:40PM 11-27-2023
    public function show($id){
        $members = Members::find($id);
        if($members){
            $data = [
                'status' => 200,
                'members' => $members
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => 'Showing no result'
            ];
            return response()->json($data, 404);
        }
    }
    #endregion

    #region show after update mark 8:47PM 11-27-2023
    public function edit($id){
        $members = Members::find($id);
        if($members){
            $data = [
                'status' => 200,
                'members' => $members
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => 'Showing no result'
            ];
            return response()->json($data, 404);
        }
    }
    #endregion

    #region update mark 9:05PM 11-27-2023
    public function update(Request $request, int $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'course' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:11',
        ]);
        if($validator->fails()){

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

        }else{
            $members = Members::find($id);

            
            if($members){
                $members->update([
                    'name' => $request->name,
                    'course' => $request->course,
                    'email' => $request->email,
                    'phone' => $request->phone,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Member details updated successfully"
                ], 200);

            }else{
                return response()->json([
                    'status' => 404,
                    'message' => "Something went wrong"
                ], 404);
            } 
        }

    }
    #endregion

    #region delete mark 9:19PM 11-27-2023
    public function destroy($id){
        $members = Members::find($id);

        if($members){
            $members->delete();
            // $members = Members::all();
            // $data = [
            //     'status' => 200,
            //     'members' => $members
            // ];
            // return response()->json($data, 200);

            return response()->json([
                'status' => 200,
                'message' => "Member deleted successfully"
            ], 200);

        }else{
            return response()->json([
                'status' => 500,
                'message' => "Something went wrong"
            ], 500);
        }
    }
    #endregion
}
